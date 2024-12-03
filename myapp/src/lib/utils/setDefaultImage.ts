import { Conversation } from "@/types/conversation";
import { Notification } from "@/types/notification";
import { Profile } from "@/types/profile";
import { TweetInfo, TweetNode } from "@/types/tweet";
import { UserInfo } from "@/types/useInfo";

export function setDefaultImageOfTweetInfos(tweets: TweetInfo[]) {
	return tweets.map((tweet) => {
		const ret = tweet;
		if (!ret.userInfo.profileImageUrl) {
			ret.userInfo.profileImageUrl = "/images/default_image.png";
		}
		return ret;
	});
}

export function setDefaultImageOfTweetNodes(tweets: TweetNode[]) {
	return tweets.map((tweet) => {
		const ret = tweet;
		if (!ret.tweet.userInfo.profileImageUrl) {
			ret.tweet.userInfo.profileImageUrl = "/images/default_image.png";
		}
		if (ret.originalTweet && !ret.originalTweet.userInfo.profileImageUrl) {
			ret.originalTweet.userInfo.profileImageUrl =
				"/images/default_image.png";
		}
		if (ret.parentReply && !ret.parentReply.userInfo.profileImageUrl) {
			ret.parentReply.userInfo.profileImageUrl =
				"/images/default_image.png";
		}
		return ret;
	});
}

export function setDefaultImageOfProfile(profile: Profile) {
	if (!profile.bannerImageUrl) {
		profile.bannerImageUrl = "/images/default_banner.png";
	}
	if (!profile.userInfo.profileImageUrl) {
		profile.userInfo.profileImageUrl = "/images/default_image.png";
	}
	return profile;
}

export function setDefaultImageOfNotifications(notifications: Notification[]) {
	return notifications.map((notification) => {
		const ret = notification;
		if (ret.senderInfo && !ret.senderInfo.profileImageUrl) {
			ret.senderInfo.profileImageUrl = "/images/default_image.png";
		}
		if (ret.relatedTweet && !ret.relatedTweet.userInfo.profileImageUrl) {
			ret.relatedTweet.userInfo.profileImageUrl =
				"/images/default_image.png";
		}
		return ret;
	});
}

export function setDefaultImageOfConversations(conversations: Conversation[]) {
	return conversations.map((conversation) => {
		const ret = conversation;
		if (!ret.opponentInfo.profileImageUrl) {
			ret.opponentInfo.profileImageUrl = "/images/default_image.png";
		}
		return ret;
	});
}

export function setDefaultImageOfUserInfos(users: UserInfo[]) {
	return users.map((user) => {
		const ret = user;
		if (!ret.profileImageUrl) {
			ret.profileImageUrl = "/images/default_image.png";
		}
		return ret;
	});
}
