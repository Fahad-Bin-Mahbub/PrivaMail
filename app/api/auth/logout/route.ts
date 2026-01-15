import { NextResponse } from "next/server";

export async function POST() {
	// In a real app with cookies, we would clear the cookie here.
	return NextResponse.json({ success: true });
}
