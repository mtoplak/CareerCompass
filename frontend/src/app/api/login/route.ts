import { signInUser } from "@/firebase/firebase.client";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json("Izpolniti morate vsa polja!", { status: 400 });
    }

    try {
        const user = await signInUser(email, password);
        if (!user.emailVerified) {
            return NextResponse.json({ error: "Email naslov ni potrjen!" }, { status: 403 });
        }
        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Napačen email naslov ali geslo!" }, { status: 401 });
    }
}
