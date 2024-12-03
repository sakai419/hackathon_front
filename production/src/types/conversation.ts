import { UserInfoWithoutBio } from "./userInfoWithoutBio";

export type Conversation = {
	id: number;
	opponentInfo: UserInfoWithoutBio;
	lastMessageTime: string;
	content: string;
	senderUserId: string;
	isRead: boolean;
};
