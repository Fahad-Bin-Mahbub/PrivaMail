import { User, Email, EncryptionKey } from "./types";

// Initial Seed Data
const INITIAL_USER: User = {
	id: "demo-user",
	name: "Demo User",
	email: "demo@example.com",
	password: "demo-password",
	twoFactorEnabled: false,
	encryptionKeys: [
		{
			id: "default-key",
			name: "Default Key",
			publicKey: "demo-public-key",
			privateKey: "demo-private-key",
			fingerprint: "AB:CD:EF:12:34:56",
			createdAt: new Date(),
			isActive: true,
		},
	],
	connectedAccounts: [
		{
			id: "gmail-account",
			provider: "gmail",
			email: "demo@gmail.com",
			connected: true,
		},
	],
	profileImage:
		"https://ui-avatars.com/api/?name=Demo+User&background=6366f1&color=fff",
};

const INITIAL_EMAILS: Email[] = [
	{
		id: "1",
		from: "john.doe@example.com",
		to: ["demo@example.com"],
		subject: "Welcome to PrivaMail!",
		body: "Thank you for joining PrivaMail. We are excited to have you on board. This is a secure platform for all your email communication needs.",
		attachments: [],
		isEncrypted: true,
		encryptionLevel: "high",
		timestamp: new Date(Date.now() - 3600000), // 1 hour ago
		read: false,
		starred: true,
		folder: "inbox",
		labels: ["2"],
	},
	{
		id: "2",
		from: "marketing@company.com",
		to: ["demo@example.com"],
		subject: "Special Offer Inside",
		body: "We have a special offer just for you! Click the link below to claim your discount.",
		attachments: [],
		isEncrypted: false,
		encryptionLevel: "standard",
		timestamp: new Date(Date.now() - 86400000), // 1 day ago
		read: true,
		starred: false,
		folder: "inbox",
	},
	{
		id: "3",
		from: "demo@example.com",
		to: ["jane.smith@example.com"],
		subject: "Confidential Project Proposal",
		body: "Please find attached the confidential project proposal we discussed yesterday.",
		attachments: [
			{
				id: "att1",
				name: "proposal.pdf",
				type: "application/pdf",
				size: 2500000,
				url: "#",
				isEncrypted: true,
			},
		],
		isEncrypted: true,
		encryptionLevel: "high",
		timestamp: new Date(Date.now() - 172800000), // 2 days ago
		read: true,
		starred: false,
		folder: "sent",
		expiresAt: new Date(Date.now() + 604800000), // 7 days from now
		readReceipt: true,
		labels: ["1", "4"],
	},
	{
		id: "4",
		from: "team@privamail.com",
		to: ["demo@example.com"],
		subject: "Your Encryption Keys",
		body: "Your encryption keys have been generated successfully. Remember to keep them safe!",
		attachments: [],
		isEncrypted: true,
		encryptionLevel: "high",
		timestamp: new Date(Date.now() - 259200000), // 3 days ago
		read: true,
		starred: true,
		folder: "inbox",
	},
	{
		id: "5",
		from: "david.wilson@example.com",
		to: ["demo@example.com"],
		subject: "Meeting Notes - Encrypted",
		body: "Please find the encrypted meeting notes from our discussion yesterday.",
		attachments: [
			{
				id: "att2",
				name: "meeting-notes.docx",
				type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
				size: 1200000,
				url: "#",
				isEncrypted: true,
			},
		],
		isEncrypted: true,
		encryptionLevel: "high",
		timestamp: new Date(Date.now() - 345600000), // 4 days ago
		read: false,
		starred: false,
		folder: "encrypted",
		labels: ["1", "3"],
	},
	{
		id: "6",
		from: "demo@example.com",
		to: ["support@orivamail.com"],
		subject: "Question about Features",
		body: "I was wondering if you could provide more information about the expiration feature for emails.",
		attachments: [],
		isEncrypted: true,
		encryptionLevel: "standard",
		timestamp: new Date(Date.now() - 432000000), // 5 days ago
		read: true,
		starred: false,
		folder: "sent",
	},
	{
		id: "7",
		from: "notifications@service.com",
		to: ["demo@example.com"],
		subject: "Account Verification",
		body: "Please verify your account by clicking the link below.",
		attachments: [],
		isEncrypted: false,
		encryptionLevel: "standard",
		timestamp: new Date(Date.now() - 518400000), // 6 days ago
		read: true,
		starred: false,
		folder: "inbox",
	},
	{
		id: "8",
		from: "newsletter@tech.com",
		to: ["demo@example.com"],
		subject: "Weekly Tech Digest",
		body: "Check out the latest tech news and updates from around the world.",
		attachments: [],
		isEncrypted: false,
		encryptionLevel: "standard",
		timestamp: new Date(Date.now() - 604800000), // 7 days ago
		read: true,
		starred: false,
		folder: "inbox",
	},
	{
		id: "9",
		from: "alex.morgan@example.com",
		to: ["demo@example.com"],
		subject: "Security Conference Invitation",
		body: "You're invited to speak at our upcoming security conference on email encryption technologies.",
		attachments: [
			{
				id: "att3",
				name: "invitation.pdf",
				type: "application/pdf",
				size: 1800000,
				url: "#",
				isEncrypted: true,
			},
		],
		isEncrypted: true,
		encryptionLevel: "high",
		timestamp: new Date(Date.now() - 259200000), // 3 days ago
		read: false,
		starred: true,
		folder: "inbox",
		labels: ["1", "2"],
	},
	{
		id: "10",
		from: "security-alerts@privamail.com",
		to: ["demo@example.com"],
		subject: "Security Alert: New Device Login",
		body: "We detected a new login to your account from a new device. If this was you, you can ignore this message.",
		attachments: [],
		isEncrypted: true,
		encryptionLevel: "high",
		timestamp: new Date(Date.now() - 86400000), // 1 day ago
		read: false,
		starred: false,
		folder: "inbox",
		labels: ["3"],
	},
];

class MockDatabase {
	private users: User[] = [];
	private emails: Email[] = [];

	constructor() {
		this.users = [INITIAL_USER];
		this.emails = [...INITIAL_EMAILS, ...ADDITIONAL_EMAILS];
	}

	// User Methods
	async getUser(email: string): Promise<User | undefined> {
		return this.users.find((u) => u.email === email);
	}

	async getUserById(id: string): Promise<User | undefined> {
		return this.users.find((u) => u.id === id);
	}

	async createUser(user: User): Promise<User> {
		this.users.push(user);
		return user;
	}

	async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
		const index = this.users.findIndex((u) => u.id === id);
		if (index === -1) return undefined;
		this.users[index] = { ...this.users[index], ...updates };
		return this.users[index];
	}

	// Email Methods
    async getInboxEmails(userId: string): Promise<Email[]> {
        return this.emails.filter(e => e.folder === "inbox");
    }

    async getStarredEmails(userId: string): Promise<Email[]> {
        return this.emails.filter(e => e.starred && e.folder !== "trash");
    }

    async getEncryptedEmails(userId: string): Promise<Email[]> {
        return this.emails.filter(e => e.isEncrypted && e.folder !== "trash");
    }

    async getSentEmails(userId: string): Promise<Email[]> {
        return this.emails.filter(e => e.folder === "sent");
    }

    async getDraftsEmails(userId: string): Promise<Email[]> {
        return this.emails.filter(e => e.folder === "drafts");
    }

    async getTrashEmails(userId: string): Promise<Email[]> {
        return this.emails.filter(e => e.folder === "trash");
    }

	async getEmails(userId: string, folder?: string): Promise<Email[]> {
		// In a real app, we'd filter by userId too
		let filtered = this.emails; // Assuming all emails belong to the demo user for now
		if (folder) {
			filtered = filtered.filter((e) => e.folder === folder);
		}
		return filtered;
	}

	async getEmail(id: string): Promise<Email | undefined> {
		return this.emails.find((e) => e.id === id);
	}

	async createEmail(email: Email): Promise<Email> {
		this.emails.unshift(email); // Add to top
		return email;
	}

	async updateEmail(id: string, updates: Partial<Email>): Promise<Email | undefined> {
		const index = this.emails.findIndex((e) => e.id === id);
		if (index === -1) return undefined;
		this.emails[index] = { ...this.emails[index], ...updates };
		return this.emails[index];
	}

	async deleteEmail(id: string): Promise<boolean> {
		const initialLength = this.emails.length;
		this.emails = this.emails.filter((e) => e.id !== id);
		return this.emails.length !== initialLength;
	}

	// ... within MockDatabase class ...
	async getUnreadCounts(userId: string): Promise<Record<string, number>> {
		const userEmails = this.emails; // Filter by userId in real app
		return {
			inbox: userEmails.filter((e) => e.folder === "inbox" && !e.read).length,
			encrypted: userEmails.filter((e) => e.isEncrypted && !e.read).length,
			starred: userEmails.filter((e) => e.starred && !e.read).length, // Usually starred doesn't show unread count but let's calculate it
			sent: 0,
			drafts: 0,
			trash: 0,
		};
	}
}

// Additional Seed Data to make it look "real"
const ADDITIONAL_EMAILS: Email[] = [
    {
        id: "11",
        from: "hr@company.com",
        to: ["demo@example.com"],
        subject: "Policy Update: Remote Work",
        body: "Attached is the updated remote work policy for Q1. Please review.",
        attachments: [],
        isEncrypted: false,
        encryptionLevel: "standard",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        read: false,
        starred: false,
        folder: "inbox",
        labels: ["1"]
    },
    {
        id: "12",
        from: "finance@privamail.com",
        to: ["demo@example.com"],
        subject: "Invoice #4092",
        body: "Your latest invoice is ready for view.",
        attachments: [{id: "inv1", name: "invoice.pdf", type: "application/pdf", size: 500000, url: "#", isEncrypted: true}],
        isEncrypted: true,
        encryptionLevel: "high",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        starred: false,
        folder: "inbox",
        labels: ["3"]
    },
     {
        id: "13",
        from: "demo@example.com",
        to: ["boss@company.com"],
        subject: "Q4 Report Draft",
        body: "Here is the first draft of the Q4 security audit.",
        attachments: [],
        isEncrypted: true,
        encryptionLevel: "high",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        read: true,
        starred: false,
        folder: "drafts",
    }
];
// Append to initial emails on load
// We do this in constructor


// Global Singleton to persist across hot reloads in dev
const globalForDb = global as unknown as { mockDb_v2: MockDatabase };

export const db = globalForDb.mockDb_v2 || new MockDatabase();

if (process.env.NODE_ENV !== "production") globalForDb.mockDb_v2 = db;
