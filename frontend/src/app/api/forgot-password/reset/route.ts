import { NextResponse } from "next/server";
import { resetPassword } from "@/firebase/firebase.client";
import { api } from "@/constants";

export async function POST(request: Request) {
	const body = await request.json();
	const { email } = body;

	if (!email) {
		return new NextResponse("Email naslov je obvezen za spremembo gesla!", { status: 400 });
	}

	const obstaja = await fetch(`${api}/user/get/${email}`);

	if (!obstaja.ok) {
		return new NextResponse("Uporabnik s tem emailom ne obstaja!", { status: 400 });
	}

	const user = await obstaja.json();

	if (obstaja.ok && user.image) {
		return new NextResponse("Uporabnik s tem emailom je prijavljen z drugo metodo!", { status: 400 });
	}

	try {
		await resetPassword(email);
	} catch (error: any) {
		return new NextResponse(error, { status: 500 });
	}

	return NextResponse.json("Email za spremembo gesla je bil poslan!", { status: 200 });
}
