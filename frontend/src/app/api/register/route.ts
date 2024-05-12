import { api } from "@/constants";
import { NextResponse } from "next/server";
import { registerUser } from "@/firebase/firebase.client";

export async function POST(request: any) {
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return NextResponse.json("Manjkajo polja.", { status: 400 });
  }
  if (password.length < 6) {
    console.log("Password is too short.");
    return NextResponse.json("Geslo je prekratko.", { status: 400 });
  }

  const response = await fetch(`${api}/user/get/${email}`);

  // check if user already exists
  if (response.ok) {
    return NextResponse.json("Uporabnik s tem e-mailom že obstaja!", { status: 409 });
  }

  // save user to firebase
  const user = registerUser(email, password);
  console.log(user);

  // save user to database
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

  return NextResponse.json("Uspešna registracija! Na izbran email ste prejeli potrditveno povezavo.", { status: 200 });
}
