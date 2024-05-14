import { api } from "@/constants";
import { NextResponse } from "next/server";
import { uploadImageToStorage } from "@/firebase/firebase.client";

export async function POST(request: any) {
    const body = await request.json();

    // save company logo to firebase
    const companyLogoUrl = await uploadImageToStorage(body.logo, body.name);
    body.logo = companyLogoUrl;

    // save company to database;
    const res = await fetch(`${api}/company`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        return NextResponse.json("Napaka pri registraciji.", { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
