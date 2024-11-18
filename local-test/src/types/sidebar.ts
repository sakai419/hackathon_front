import {
	APIUserInfoWithoutBio,
	UserInfoWithoutBio,
} from "./userInfoWithoutBio";

export type SidebarInfo = {
	UserInfo: UserInfoWithoutBio;
	UnreadConversationCount: number;
	UnreadNotificationCount: number;
};

export type APISidebarInfo = {
	user_info: APIUserInfoWithoutBio;
	unread_conversation_count: number;
	unread_notification_count: number;
};
