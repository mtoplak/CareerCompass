# CareerCompass – navodila za vzpostavitev (lokalno okolje)

Ta dokument nadgrajuje obstoječa navodila v [README.md](../README.md) in v GitBook dokumentaciji
([Namestitev](https://career-compass.gitbook.io/career-compass/namestitev/zaledje)).

Dokument obravnava različico projekta ob koncu razvoja, to je zadnji commit do konca junija 2024: **`4838f3d`
(9. 6. 2024)**. Poznejše spremembe v repozitoriju (november–december 2025) niso upoštevane. Navodila so bila 5. in
8. 10. 2026 preizkušena v lokalnem repozitoriju projekta z obstoječimi `.env` datotekami na Windows 11. Vsa razhajanja
med starimi navodili in dejanskim stanjem so zbrana v poglavju
[Razhajanja z obstoječo dokumentacijo](#razhajanja-z-obstoječo-dokumentacijo).

## 1. Sestava rešitve

| Del | Mapa | Tehnologija | Privzeta vrata |
| --- | --- | --- | --- |
| Zaledje (REST API) | `backend/` | NestJS 10, Mongoose 8, OpenAI SDK, Firebase Admin | 4000 |
| Obličje (spletna aplikacija) | `frontend/` | Next.js 14 (App Router), NextAuth, Firebase (Auth, Storage), Tailwind | 3000 |
| Podatkovna baza | – | MongoDB (prej MongoDB Atlas) | 27017 |
| Spletni pajek | `scraper/`, `scraper/cron-job/` | Puppeteer, Vercel serverless | – |
| Učenje AI modela | `ai-chatbot/` | OpenAI fine-tuning (gpt-3.5-turbo) | – |

Obličje kliče zaledje neposredno iz brskalnika in iz strežniških API poti (`frontend/src/app/api/*`). Naslov zaledja
določa `frontend/src/constants.ts`: v razvojnem načinu (`NODE_ENV=development`) je to vedno `http://localhost:4000`,
sicer vrednost `NEXT_PUBLIC_API_URL`.

## 2. Predpogoji

- **Node.js 20 ali novejši** in npm (preizkušeno z Node.js 24.15 in npm 10.2). Node 18, ki ga navaja `scraper/cron-job`,
  je potreben le za pajka na Vercelu.
- **MongoDB 6+** lokalno (namestitev MongoDB Community Server ali Docker). Prvotna baza na MongoDB Atlas ne obstaja več.
- **Git.**
- Za celotno delovanje še dostop do zunanjih storitev (glej [poglavje 7](#7-stanje-zunanjih-storitev)): Firebase projekt
  (Auth + Storage), OpenAI API ključ s krediti in fine-tuned model, Google OAuth odjemalec.

## 3. Kloniranje

```bash
git clone https://github.com/mtoplak/CareerCompass.git
cd CareerCompass
git checkout 4838f3d          # različica iz junija 2024
```

## 4. Podatkovna baza (MongoDB)

Izberite eno od možnosti.

**a) Nameščen MongoDB Server (Windows)** – če je MongoDB nameščen kot Windows storitev, ki se zažene samodejno, ni treba
narediti ničesar. Sicer ga zaženite ročno z lastno podatkovno mapo (brez administratorskih pravic):

```powershell
mkdir D:\CareerCompass-db
& "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe" --dbpath D:\CareerCompass-db --port 27017 --bind_ip 127.0.0.1
```

**b) Docker:**

```bash
docker run -d --name careercompass-mongo -p 27017:27017 -v careercompass-db:/data/db mongo:6
```

Povezovalni niz za oba primera je `mongodb://127.0.0.1:27017/careercompass`. Bazo napolnite po zagonu zaledja
([korak 5.4](#54-polnjenje-baze-s-testnimi-podatki)).

## 5. Zaledje (`backend/`)

### 5.1 Namestitev odvisnosti

```bash
cd backend
npm ci
```

`npm ci` namesti točne različice iz `package-lock.json` (tako kot CI). `npm install` deluje enako, a če se prekine
(npr. omrežna napaka `ECONNRESET`), lahko pusti poškodovane pakete – v tem primeru izbrišite `node_modules` in ponovite
`npm ci`.

### 5.2 Datoteka `.env`

V mapi `backend/` ustvarite `.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/careercompass
OPENAI_API_KEY=
FINE_TUNE_MODEL=

# Firebase Admin (servisni račun) – trenutno ga koda ne uporablja, glej opombo
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
FIREBASE_CLIENT_ID=
FIREBASE_CLIENT_X509_CERT_URL=
```

| Spremenljivka | Obvezna | Namen |
| --- | --- | --- |
| `MONGODB_URI` | da | Povezava na MongoDB. Brez delujoče baze se zaledje ne zažene (po 9 poskusih konča z napako). |
| `OPENAI_API_KEY` | za AI funkcije | AI svetovalec (`POST /ai`) in AI preverjanje komentarjev pri ocenjevanju. |
| `FINE_TUNE_MODEL` | za AI svetovalca | Ime fine-tuned modela (`ft:gpt-3.5-turbo-...`), pridobljenega v `ai-chatbot/`. |
| `FIREBASE_*` | ne | Servisni račun za `FirebaseAuthMiddleware`. Middleware v `AppModule` ni priklopljen, zato se vrednosti ne berejo. |
| `PORT` | ne | Vrata strežnika (privzeto 4000). |

### 5.3 Zagon, testi, gradnja

```bash
npm start            # ali: npm run start:dev (s samodejnim ponovnim nalaganjem)
```

Preverba: `http://localhost:4000/` vrne `Hello, World!`.

```bash
npm run test         # testi enot (Jest) – ne potrebujejo baze
npm run test:cov     # testi enot s poročilom o pokritosti (mapa coverage/)
npm run test:e2e -- --forceExit   # e2e test – potrebuje delujočo bazo iz .env
npm run build        # prevod v dist/
```

Pozor: `npm run lint` kliče ESLint s stikalom `--fix` in **spreminja datoteke**. Za samo preverjanje uporabite
`npx eslint "{src,test}/**/*.ts"`.

### 5.4 Polnjenje baze s testnimi podatki

Nova baza je prazna. Skripta `backend/scripts/seed-local-db.js` prek REST API-ja zaledja (zaledje mora teči) uvozi
podjetja iz `scraper/scraped_results.json` in zaposlitvene oglase iz `scraper/scrapedJobAds.json`. Ker gre skozi
`POST /company` in `POST /job`, aplikacija sama ustvari povprečne ocene podjetij in poveže oglase s podjetji.

```bash
cd backend
node scripts/seed-local-db.js            # privzeto http://localhost:4000
```

Pričakovan izpis:

```
Podjetja: 651/662
Oglasi za delo: 263/264 (ostali nimajo ujemajočega podjetja)
```

11 podjetij v podatkih pajka nima polja `industry`, ki je v shemi obvezno, zato jih API zavrne. Skripta je idempotentna:
če baza že vsebuje podjetja, ne naredi ničesar.

## 6. Obličje (`frontend/`)

### 6.1 Namestitev odvisnosti

```bash
cd frontend
npm ci
```

Če gradnja javi `Failed to load SWC binary for win32/x64` ali `Module not found: Can't resolve 'tslib'`, je namestitev
nepopolna (običajno po prekinjenem `npm install`): izbrišite `node_modules` in `.next` ter ponovite `npm ci`.

### 6.2 Datoteka `.env`

V mapi `frontend/` ustvarite `.env`:

```env
SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=mongodb://127.0.0.1:27017/careercompass

NEXT_PUBLIC_API_URL=
NODE_ENV=development
DATABASE_URL=

FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=

# NextAuth EmailProvider (prijava s povezavo po e-pošti)
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
```

| Spremenljivka | Namen |
| --- | --- |
| `SECRET` | Poljuben naključen niz za podpisovanje NextAuth JWT žetonov. |
| `NEXTAUTH_URL`, `NEXT_PUBLIC_SITE_URL` | Naslov obličja. Če obličje teče na drugih vratih (npr. 3001), ju ustrezno popravite. |
| `MONGODB_URI` | NextAuth MongoDB adapter (kolekcija uporabnikov za prijavo). Mora kazati na **isto** bazo kot zaledje. |
| `NEXT_PUBLIC_API_URL` | Naslov zaledja v produkcijskem načinu. V razvoju se ne uporablja (glej `src/constants.ts`). |
| `NODE_ENV` | `development` za lokalni razvoj. |
| `FIREBASE_*` | Firebase Auth (registracija, prijava, potrditev e-pošte, ponastavitev gesla) in Storage (logotipi). |
| `GOOGLE_CLIENT_*` | Prijava z Google računom. |
| `EMAIL_*` | NextAuth `EmailProvider`. |

`frontend/prisma/schema.prisma` bere še `DATABASE_URL`. Prisma uporabljata le poti `/api/forgot-password/verify-token`
in `/api/forgot-password/update`, ki ju kliče stran `/reset-password/[token]` – ostanek uporabljene predloge, saj
povezavo za ponastavitev gesla dejansko pošlje Firebase (`sendPasswordResetEmail`) in vodi na Firebase stran. V
obstoječi `.env` je `DATABASE_URL` nastavljen; obnašanje brez njega ni bilo preverjeno.

### 6.3 Zagon in gradnja

```bash
npm run dev          # http://localhost:3000
npm run build        # produkcijska gradnja (Next.js 14.2.3, 29 strani)
npm start            # zagon produkcijske gradnje
npm run lint         # ESLint (next/core-web-vitals)
```

Če so vrata 3000 zasedena, Next.js samodejno izbere 3001 – v tem primeru popravite `NEXTAUTH_URL`, sicer prijava ne
deluje pravilno.

## 7. Stanje zunanjih storitev

Preverjeno 5. 10. 2026 s ključi iz obstoječih `.env` datotek projekta. Gre za stanje storitev danes, ne junija 2024.

| Storitev | Stanje | Posledica za lokalno okolje |
| --- | --- | --- |
| MongoDB Atlas (`careercompassdatabase.7a8bbng.mongodb.net`) | ne obstaja (DNS: NXDOMAIN) | Nadomeščeno z lokalnim MongoDB in skripto za polnjenje. |
| Produkcijsko obličje `career-compass-front.vercel.app` | HTTP 504 | Aplikacija je dosegljiva le lokalno. |
| Produkcijsko zaledje | ni dosegljivo | – |
| Firebase Auth | deluje | Registracija/prijava sta možni (potrebna je potrditev e-pošte). |
| Firebase Storage (logotipi) | HTTP 402 (projekt brez plačilnega načrta) | Logotipi podjetij se ne prikažejo; nalaganje logotipa pri registraciji/urejanju podjetja ne deluje. |
| OpenAI API | HTTP 429 – račun nima kreditov | AI svetovalec vrne napako 500; ocena podjetja **s komentarjem** vrne 500 (ocena brez komentarja deluje). |
| SonarCloud projekt `mtoplak_CareerCompass` | ne obstaja | Korak SonarCloud v CI pade. |

Za polno delovanje je treba ustvariti nov Firebase projekt (ali omogočiti plačilni načrt), dodati kredite na OpenAI
račun (in po potrebi ponovno izvesti fine-tuning v `ai-chatbot/`) ter po želji nov MongoDB Atlas cluster.

## 8. Testi

| Ukaz | Mapa | Kaj zažene |
| --- | --- | --- |
| `npm run test` | `backend/` | 2 testni zbirki, 12 testov enot (Jest). |
| `npm run test:cov` | `backend/` | Isto + poročilo o pokritosti. |
| `npm run test:e2e -- --forceExit` | `backend/` | 1 e2e test (`GET /`), potrebuje bazo. Brez `--forceExit` Jest po uspešnem testu ne izstopi, ker povezava na MongoDB ostane odprta. |

Podrobnosti so v dokumentu [Stanje testiranja in zagotavljanja kakovosti](STANJE_TESTIRANJA_IN_KAKOVOSTI.md).

## 9. Hitri povzetek (vse skupaj)

```bash
# 1. baza
mongod --dbpath <mapa> --port 27017            # ali Docker (korak 4)

# 2. zaledje
cd backend && npm ci && (ustvari .env) && npm start
node scripts/seed-local-db.js                   # v drugem terminalu, enkrat

# 3. obličje
cd frontend && npm ci && (ustvari .env) && npm run dev
# odpri http://localhost:3000
```

## Razhajanja z obstoječo dokumentacijo

| # | Obstoječa navodila (README / GitBook) | Dejansko stanje | Popravek |
| --- | --- | --- | --- |
| 1 | `MONGODB_URI` kaže na Atlas cluster `careercompassdatabase.7a8bbng`. | Cluster ne obstaja; zaledje se ne zažene. | Lokalni MongoDB (korak 4) in skripta za polnjenje baze (korak 5.4). |
| 2 | Nobena navodila za začetne podatke. | Prazna baza → prazna aplikacija. | `backend/scripts/seed-local-db.js`. |
| 3 | Backend `.env` vsebuje le `MONGODB_URI`, `OPENAI_API_KEY`, `FINE_TUNE_MODEL`. | Lokalni `.env` ima še 6 `FIREBASE_*` spremenljivk za servisni račun. | Dokumentirane v 5.2 z opombo, da trenutno niso v uporabi. |
| 4 | Frontend `.env` brez `EMAIL_*`. | `src/utils/auth.ts` jih uporablja za `EmailProvider`. | Dodane v 6.2. |
| 5 | `NEXT_PUBLIC_API_URL` – "naslov javno dostopnega API-ja". | V razvoju se ignorira; obličje vedno kliče `localhost:4000`. | Pojasnjeno v 1 in 6.2. |
| 6 | Navedeno je le `npm install`. | Prekinjena namestitev pusti poškodovan SWC binarni paket in manjkajoče odvisnosti (`tslib`, `@floating-ui/dom`). | Priporočen `npm ci`; dodano odpravljanje težav. |
| 7 | README: "npm install … to build the server". | `npm install` samo namesti odvisnosti. | Popravljeno v README. |
| 8 | Testiranje: le `npm run test` (testi enot). | Obstaja še e2e test (`npm run test:e2e`), ki brez `--forceExit` ne izstopi. | Dokumentirano v 8. |
| 9 | Ni opozorila o `npm run lint`. | Backend `lint` uporablja `--fix` in spreminja datoteke. | Opozorilo v 5.3. |
| 10 | – | Domača stran v trenutnih različicah Chroma sproži `TypeError: destroy is not a function` (potrjeno na `4838f3d`). Vzrok: `ScrollUp.tsx` iz `useEffect` vrne rezultat `scrollTo()`, ki je v novejšem Chromu Promise. | Popravljeno v `frontend/src/components/Common/ScrollUp.tsx`. |
| 11 | – | Firebase Storage (402) in OpenAI (429) nista več na voljo. | Navedeno v poglavju 7. |
| 12 | – | Vrata 3000 so lahko zasedena; Next.js preklopi na 3001, `NEXTAUTH_URL` pa ostane 3000. | Opozorilo v 6.3. |

---

*Izjava o uporabi generativne umetne inteligence:* dokument je pripravil agent Claude Code (model Claude Opus 5.5), ki
je navodila sam izvedel v lokalnem repozitoriju projekta (različica `4838f3d` v ločenem git worktree-ju). Vsak korak je bil preverjen z dejanskim zagonom ukazov (izpisi
namestitve, gradnje in testov, odzivi API-ja, posnetki zaslona strani v brskalniku Chrome prek Playwrighta).
