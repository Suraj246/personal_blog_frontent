import { NextResponse } from "next/server"

export async function GET(req, res) {
    // return new Response("new route")
    return NextResponse.json({ message: "new route" })
}
