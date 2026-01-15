import { NextResponse } from "next/server";
import { db } from "@/lib/mock-db";
import { User } from "@/lib/types";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, password } = body;

		const existingUser = await db.getUser(email);
		if (existingUser) {
			return NextResponse.json(
				{ error: "User already exists" },
				{ status: 400 }
			);
		}

		const newUser: User = {
			id: Math.random().toString(36).substr(2, 9),
			name,
			email,
			password, // In real app, hash this
			twoFactorEnabled: false,
			encryptionKeys: [
				{
					id: Math.random().toString(36).substr(2, 9),
					name: "Default Key",
					publicKey: "generated-public-key",
					privateKey: "generated-private-key",
					fingerprint: "XX:XX:XX:XX:XX:XX",
					createdAt: new Date(),
					isActive: true,
				},
			],
			connectedAccounts: [],
			profileImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(
				name
			)}&background=random&color=fff`,
		};

		await db.createUser(newUser);

		return NextResponse.json({ user: newUser });
	} catch (error) {
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
