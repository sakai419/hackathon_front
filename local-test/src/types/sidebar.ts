import { UserInfoWithoutBio } from "./userInfoWithoutBio";

export type SidebarInfo = {
	userInfo: UserInfoWithoutBio;
	unreadConversationCount: number;
	unreadNotificationCount: number;
};
