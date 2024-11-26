import { Notification } from "@/types/notification";
import { Profile } from "@/types/profile";
import { TweetNode } from "@/types/tweetInfo";

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
