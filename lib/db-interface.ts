import { User, Email } from "./types";

export interface IDatabase {
    // User Methods
    getUser(email: string): Promise<User | undefined>;
    getUserById(id: string): Promise<User | undefined>;
    createUser(user: User): Promise<User>;
    updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;

    // Email Methods
    getInboxEmails(userId: string): Promise<Email[]>;
    getStarredEmails(userId: string): Promise<Email[]>;
    getEncryptedEmails(userId: string): Promise<Email[]>;
    getSentEmails(userId: string): Promise<Email[]>;
    getDraftsEmails(userId: string): Promise<Email[]>;
    getTrashEmails(userId: string): Promise<Email[]>;
    getEmails(userId: string, folder?: string): Promise<Email[]>;
    getEmail(id: string): Promise<Email | undefined>;
    createEmail(email: Email): Promise<Email>;
    updateEmail(id: string, updates: Partial<Email>): Promise<Email | undefined>;
    deleteEmail(id: string): Promise<boolean>;
    restoreEmail(id: string): Promise<boolean>;
    getUnreadCounts(userId: string): Promise<Record<string, number>>;
}
