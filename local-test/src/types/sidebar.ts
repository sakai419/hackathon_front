import { UserInfoWithoutBio } from "./userInfoWithoutBio";

export type SidebarInfo = {
	UserInfo: UserInfoWithoutBio;
	UnreadConversationCount: number;
	UnreadNotificationCount: number;
};
