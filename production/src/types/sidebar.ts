import { LabelCount } from "./label";
import { UserInfoWithoutBio } from "./userInfoWithoutBio";

export type LeftSidebarInfo = {
	unreadConversationCount: number;
	unreadNotificationCount: number;
};

export type RightSidebarInfo = {
	recentLabels: LabelCount[];
	followSuggestions: UserInfoWithoutBio[];
};
