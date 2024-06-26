import { api } from "@/constants";
import { NextResponse } from "next/server";
import { registerUser } from "@/firebase/firebase.client";

export async function POST(request: any) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json("Izpolniti morate vsa polja!", { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json("Geslo mora vsebovati vsaj 6 znakov!", { status: 400 });
  }

  const response = await fetch(`${api}/user/get/${email}`);

  if (response.ok) {
    return NextResponse.json("Uporabnik s tem e-mailom že obstaja!", { status: 409 });
  }

  try {
    await registerUser(email, password);
  } catch (error) {
    return NextResponse.json("Napaka pri registraciji.", { status: 500 });
  }

  const res = await fetch(`${api}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  });

  if (!res.ok) {
    return NextResponse.json("Napaka pri registraciji.", { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
