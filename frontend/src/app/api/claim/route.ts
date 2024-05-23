import { api } from "@/constants";
import { NextResponse } from "next/server";
import { registerUser } from "@/firebase/firebase.client";

export async function POST(request: any) {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json("Izpolniti morate vsa polja!", { status: 400 });
    }
    if (password.length < 6) {
        return NextResponse.json("Geslo mora vsebovati vsaj 6 znakov!", { status: 400 });
    }

    const response = await fetch(`${api}/user/get/${email}`);

    if (response.ok) {
        return NextResponse.json("Uporabnik oz. podjetje s tem e-mailom že obstaja!", { status: 409 });
    }

    const companyResponse = await fetch(`${api}/company/claim`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email }),
    });

    const emailMatch = await companyResponse.json();

    if (!emailMatch.success) {
        return NextResponse.json("Podjetje s tem emailom ne obstaja!", { status: 409 });
    }
    const company = emailMatch.company;

    try {
        await registerUser(email, password);
    } catch (error) {
        return NextResponse.json("Napaka pri pošiljanju potrditvenega emaila.", { status: 500 });
    }

    try {
        await fetch(`${api}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: company.name,
                email: email,
                company: company._id // ?
            }),
        });
    } catch (error) {
        return NextResponse.json("Napaka pri prevzemu profila.", { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
