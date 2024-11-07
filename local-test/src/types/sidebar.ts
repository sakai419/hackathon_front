import { UserWithoutBio } from "./userWithoutBio";

export type SidebarInfo = {
	userInfo: UserWithoutBio;
	unreadConversationCount: number;
	unreadNotificationCount: number;
};
