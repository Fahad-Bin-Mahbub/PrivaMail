export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	twoFactorEnabled: boolean;
	encryptionKeys: EncryptionKey[];
	connectedAccounts: ConnectedAccount[];
	profileImage?: string;
}

export interface EncryptionKey {
	id: string;
	name: string;
	publicKey: string;
	privateKey: string;
	fingerprint: string;
	createdAt: Date;
	isActive: boolean;
}

export interface ConnectedAccount {
	id: string;
	provider: "gmail" | "outlook" | "yahoo" | "other";
	email: string;
	connected: boolean;
}

export interface Email {
	id: string;
	from: string;
	to: string[];
	cc?: string[];
	bcc?: string[];
	subject: string;
	body: string;
	attachments: Attachment[];
	isEncrypted: boolean;
	encryptionLevel: "standard" | "high";
	timestamp: Date;
	read: boolean;
	starred: boolean;
	folder: "inbox" | "sent" | "drafts" | "trash" | "encrypted" | "archived";
	expiresAt?: Date;
	readReceipt?: boolean;
	passwordProtected?: boolean;
	passwordHint?: string;
	labels?: string[];
}

export interface Attachment {
	id: string;
	name: string;
	type: string;
	size: number;
	url: string;
	isEncrypted: boolean;
}

export interface Label {
	id: string;
	name: string;
	color: string;
}
