import { api } from "@/constants";
import { NextResponse } from "next/server";

export async function POST(request: any) {
    const body = await request.json();

    // delete company
    const response = await fetch(
        `${api}/company/${body.id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );

    // delete user
    const res2 = await fetch(
        `${api}/user/${body.user_id}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );


    if (!response.ok || !res2.ok) {
        return NextResponse.json("Napaka pri registraciji.", { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
}
