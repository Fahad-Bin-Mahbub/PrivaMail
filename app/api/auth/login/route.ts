import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, password } = body;

		const user = await db.getUser(email);

		if (!user || user.password !== password) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		}

		// detailed user object but exclude password in a real app
		return NextResponse.json({ user });
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
