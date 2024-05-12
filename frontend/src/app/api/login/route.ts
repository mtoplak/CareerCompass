import { signInUser } from "@/firebase/firebase.client";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json("Manjkajo polja.", { status: 400 });
    }

    try {
        const user = await signInUser(email, password);
        console.log(user);
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Napačen email naslov ali geslo!" }, { status: 401 });
    }
}
