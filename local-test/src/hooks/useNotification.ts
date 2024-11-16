import getNotifications from "@/services/api/notifications/getNotifications";
import { useState, useEffect } from "react";
import { Notification, NotificationType } from "@/types/notification";
import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import { Media, TweetInfo } from "@/types/tweetInfo";

export default function useNotifications() {
	const [notifications, setNotifications] = useState<Notification[] | null>(
		[]
	);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				setLoading(true);
				const data = await getNotifications();
				if (data) {
					// JSON形式に変換し、Notification型に整形
					const notificationData = data.map((notification: any) => {
						const ret = {
							NotificationId: notification.id,
							Type: notification.type as NotificationType,
							Content: notification.content,
							IsRead: notification.is_read,
							CreatedAt: notification.created_at,
						} as Notification;

						if (notification.sender_info) {
							ret.SenderInfo = {
								UserId: notification.sender_info.user_id,
								UserName: notification.sender_info.user_name,
								ProfileImageUrl:
									notification.sender_info.profile_image_url,
								IsPrivate: notification.sender_info.is_private,
								IsAdmin: notification.sender_info.is_admin,
							} as UserInfoWithoutBio;
						}

						if (notification.related_tweet) {
							ret.RelatedTweet = {
								TweetId: notification.related_tweet.tweet_id,
								UserInfo: {
									UserId: notification.related_tweet.user_info
										.user_id,
									UserName:
										notification.related_tweet.user_info
											.user_name,
									ProfileImageUrl:
										notification.related_tweet.user_info
											.profile_image_url,
									IsPrivate:
										notification.related_tweet.user_info
											.is_private,
									IsAdmin:
										notification.related_tweet.user_info
											.is_admin,
								} as UserInfoWithoutBio,
								LikesCount:
									notification.related_tweet.likes_count,
								RetweetsCount:
									notification.related_tweet.retweets_count,
								RepliesCount:
									notification.related_tweet.replies_count,
								IsQuote: notification.related_tweet.is_quote,
								IsReply: notification.related_tweet.is_reply,
								IsPinned: notification.related_tweet.is_pinned,
								HasLiked: notification.related_tweet.has_liked,
								HasRetweeted:
									notification.related_tweet.has_retweeted,
								CreatedAt:
									notification.related_tweet.created_at,
							} as TweetInfo;

							ret.RelatedTweet.Content =
								notification.related_tweet.content;
							ret.RelatedTweet.Code =
								notification.related_tweet.code;
							if (notification.related_tweet.media) {
								ret.RelatedTweet.Media = {
									type: notification.related_tweet.media.type,
									url: notification.related_tweet.media.url,
								} as Media;
							}
						}

						return ret;
					});

					setNotifications(notificationData);
				}
			} catch (err) {
				setError("Failed to fetch notifications");
			} finally {
				setLoading(false);
			}
		};
		fetchNotifications();
	}, []);
	return {
		notifications,
		loading,
		error,
	};
}
