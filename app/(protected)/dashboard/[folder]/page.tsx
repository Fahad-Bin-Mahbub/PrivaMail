"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { EmailList } from "@/components/dashboard/email-list";
import { useAuth } from "@/components/providers/auth-provider";
import { Email, Label } from "@/lib/types";

// Mock data (move to a key if needed, or import from mock-db)
// Importing from mock-db would be better, but mock-db is client-side state in memory?
// mock-db.ts exports `db` which is a singleton class instance.
import { db } from "@/lib/mock-db";

export default function FolderPage() {
	const params = useParams();
	const folder = Array.isArray(params.folder) ? params.folder[0] : params.folder;
	const { user } = useAuth();

	const [emails, setEmails] = useState<Email[]>([]);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [labels] = useState<Label[]>([
		{ id: "1", name: "Work", color: "blue" },
		{ id: "2", name: "Personal", color: "green" },
		{ id: "3", name: "Urgent", color: "red" },
		{ id: "4", name: "Projects", color: "purple" },
	]);

	const fetchEmails = async () => {
		setIsRefreshing(true);
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 500));
		
		let folderEmails: Email[] = [];
		if (user) {
			const lowerFolder = folder?.toLowerCase().trim();
			
			switch (lowerFolder) {
				case "starred":
					folderEmails = await db.getStarredEmails(user.id);
					break;
				case "encrypted":
					folderEmails = await db.getEncryptedEmails(user.id);
					break;
				case "sent":
					folderEmails = await db.getSentEmails(user.id);
					break;
				case "drafts":
					folderEmails = await db.getDraftsEmails(user.id);
					break;
				case "trash":
					folderEmails = await db.getTrashEmails(user.id);
					break;
				case "inbox":
				default:
					// Default to Inbox for unknown folders or explicit "inbox"
					folderEmails = await db.getInboxEmails(user.id);
					break;
			}
		}
		
		setEmails(folderEmails);
		setIsRefreshing(false);
	};
	useEffect(() => {
		fetchEmails();
	}, [folder, user]);

	const handleRefresh = () => {
		fetchEmails();
		toast.success("Refreshed");
	};

	const handleToggleStar = (emailId: string) => {
		// Update DB
		const email = emails.find(e => e.id === emailId);
		if (email) {
			db.updateEmail(emailId, { starred: !email.starred });
			// Update local state
			setEmails(emails.map(e => e.id === emailId ? { ...e, starred: !e.starred } : e));
		}
	};

	const handleAction = (emailIds: string[], action: (id: string) => void) => {
		emailIds.forEach(id => action(id));
		fetchEmails(); // Refresh list
	};

	const handleDelete = (emailIds: string[]) => {
		emailIds.forEach(id => {
			if (folder === "trash") {
				db.deleteEmail(id);
			} else {
				db.updateEmail(id, { folder: "trash" });
			}
		});
		toast.success("Moved to trash");
		fetchEmails();
	};

	const handleArchive = (emailIds: string[]) => {
		emailIds.forEach(id => db.updateEmail(id, { folder: "archived" }));
		toast.success("Archived");
		fetchEmails();
	};

	const handleMarkAsRead = (emailIds: string[], read: boolean) => {
		emailIds.forEach(id => db.updateEmail(id, { read }));
		toast.success(read ? "Marked as read" : "Marked as unread");
		fetchEmails();
	};

	return (
		<EmailList
			emails={emails}
			user={user}
			labels={labels}
			activeFolder={folder}
			onRefresh={handleRefresh}
			isRefreshing={isRefreshing}
			onToggleStar={handleToggleStar}
			onDelete={handleDelete}
			onArchive={handleArchive}
			onMarkAsRead={handleMarkAsRead}
		/>
	);
}
