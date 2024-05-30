import { api } from "@/constants";
import { NextResponse } from "next/server";
import { uploadImageToStorage } from "@/firebase/firebase.client";

export async function POST(request: any) {
    const body = await request.json();

    if (body.newLogo) {
        const companyLogoUrl = await uploadImageToStorage(body.newLogo, body.name);
        body.logo = companyLogoUrl;
    }

    const res = await fetch(
        `${api}/company/${body.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    );

    if (!res.ok) {
        return NextResponse.json("Napaka pri urejanju podatkov!", { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
