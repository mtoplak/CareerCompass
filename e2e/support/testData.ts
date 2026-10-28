import { MongoClient } from "mongodb";

const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
const authEmulatorUrl = `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`;
const projectId = process.env.FIREBASE_PROJECT_ID!;
// The emulator accepts this token for its admin endpoints.
const emulatorAdmin = { Authorization: "Bearer owner", "Content-Type": "application/json" };

export const COMPANY_LOGO = "/images/logo/logocompass.png";

async function request<T>(url: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
  });
  if (!res.ok) {
    throw new Error(`${init.method ?? "GET"} ${url} -> ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

/** Empties the test database and the Firebase Auth emulator. */
export async function resetTestData() {
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db();
    if (!db.databaseName.endsWith("_e2e")) {
      throw new Error(`Refusing to clear "${db.databaseName}": the tests only clear *_e2e databases.`);
    }
    const collections = await db.collections();
    await Promise.all(collections.map((collection) => collection.deleteMany({})));
  } finally {
    await client.close();
  }

  await request(`${authEmulatorUrl}/emulator/v1/projects/${projectId}/accounts`, { method: "DELETE" });
}

export type Company = { id: string; slug: string; name: string; email: string };

export async function createCompany(company: {
  name: string;
  industry: string;
  email?: string;
  city?: string;
}): Promise<Company> {
  return request<Company>(`${apiUrl}/company`, {
    method: "POST",
    body: JSON.stringify({
      name: company.name,
      address: "Testna ulica 1",
      city: company.city ?? "Maribor",
      logo: COMPANY_LOGO,
      website: "",
      industry: [company.industry],
      subindustry: [],
      email: company.email ?? "",
    }),
  });
}

/**
 * Submits ratings through the rating API, so the company's average and all related aggregates
 * are computed by the application itself. Each rating lists the 8 categories that make up the
 * average (team, personal development, flexibility, work-life balance, work environment,
 * leadership, benefits, bonuses).
 */
export async function rateCompany(slug: string, ratings: number[][]) {
  for (const scores of ratings) {
    const [team, personal_development, flexibility, work_life_balance, work_environment, leadership, benefits, bonuses] =
      scores;
    await request(`${apiUrl}/rating`, {
      method: "POST",
      body: JSON.stringify({
        company_slug: slug,
        team,
        personal_development,
        flexibility,
        work_life_balance,
        work_environment,
        leadership,
        benefits,
        bonuses,
        remote_work: false,
        experience: "Nevtralna",
        difficulty: "Srednje",
      }),
    });
  }
}

export async function createJob(job: {
  position: string;
  description: string;
  city: string;
  company: Company;
  application?: string;
}) {
  return request<{ _id: string }>(`${apiUrl}/job`, {
    method: "POST",
    body: JSON.stringify({
      position: job.position,
      description: job.description,
      city: job.city,
      company: job.company.name,
      url: `/podjetje/${job.company.slug}`,
      source: "Career Compass",
      application: job.application ?? "",
    }),
  });
}

/**
 * Creates an account the way a verified registration leaves it: a Firebase Auth user with a
 * confirmed e-mail and the matching user in the application database.
 */
export async function createVerifiedAccount(account: {
  name: string;
  email: string;
  password: string;
  company?: Company;
}) {
  const { localId } = await request<{ localId: string }>(
    `${authEmulatorUrl}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({ email: account.email, password: account.password, returnSecureToken: true }),
    },
  );
  await request(`${authEmulatorUrl}/identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:update`, {
    method: "POST",
    headers: emulatorAdmin,
    body: JSON.stringify({ localId, emailVerified: true }),
  });
  await request(`${apiUrl}/user`, {
    method: "POST",
    body: JSON.stringify({ name: account.name, email: account.email, company: account.company?.id ?? null }),
  });
}

/** All e-mails (verification, password reset) the Firebase Auth emulator "sent", as JSON. */
export const emulatorOutboxUrl = `${authEmulatorUrl}/emulator/v1/projects/${projectId}/oobCodes`;

export type OutboxMessage = { email: string; requestType: string; oobLink: string };

export function findVerificationMessage(outbox: { oobCodes: OutboxMessage[] }, email: string) {
  return outbox.oobCodes.find((message) => message.email === email && message.requestType === "VERIFY_EMAIL");
}

export async function findAuthAccount(email: string) {
  const { users } = await request<{ users?: { email: string; emailVerified: boolean }[] }>(
    `${authEmulatorUrl}/identitytoolkit.googleapis.com/v1/projects/${projectId}/accounts:lookup`,
    { method: "POST", headers: emulatorAdmin, body: JSON.stringify({ email: [email] }) },
  );
  return users?.[0];
}

/** Looks the user up in the application database through the backend. */
export async function findAppUser(email: string) {
  const res = await fetch(`${apiUrl}/user/get/${encodeURIComponent(email)}`);
  if (res.status === 404) return undefined;
  if (!res.ok) throw new Error(`GET /user/get/${email} -> ${res.status}`);
  return res.json();
}

/** A valid address that is not registered yet: unique per test run. */
export function unregisteredEmail(prefix: string) {
  return `${prefix}.${Date.now()}@example.com`;
}
