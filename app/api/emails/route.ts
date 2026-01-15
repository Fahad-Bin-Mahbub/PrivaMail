import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";
import { Email } from "@/lib/types";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const folder = searchParams.get("folder") || "inbox";
	// In a real app, we'd get the user ID from the session/token
	const userId = "demo-user"; 

	const emails = await db.getEmails(userId, folder);
	return NextResponse.json(emails);
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		// In a real app, validate body
		const newEmail: Email = {
			...body,
			id: `Msg-${Date.now()}`,
			timestamp: new Date(),
			read: true, // Sender sees as read
			folder: "sent",
		};

		await db.createEmail(newEmail);
		return NextResponse.json(newEmail);
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
