import getUserTweets from "@/services/api/users/getUserTweets";
import { MediaTypes, TweetInfo, TweetNode } from "@/types/tweetInfo";
import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import { useEffect, useState } from "react";

export default function useUserTweets(userId: string) {
	const [tweets, setTweets] = useState<TweetNode[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserTweets = async () => {
			try {
				setLoading(true);
				const data = await getUserTweets(userId);
				if (data) {
					const tweetList = data.map((node: any) => {
						const tweetItem = node.tweet;
						const tweet = {
							TweetId: tweetItem.tweet_id,
							UserInfo: {
								UserId: tweetItem.user_info.user_id,
								UserName: tweetItem.user_info.user_name,
								ProfileImageUrl:
									tweetItem.user_info.profile_image_url,
								IsPrivate: tweetItem.user_info.is_private,
								IsAdmin: tweetItem.user_info.is_admin,
							} as UserInfoWithoutBio,
							LikesCount: tweetItem.likes_count,
							RetweetsCount: tweetItem.retweets_count,
							RepliesCount: tweetItem.replies_count,
							IsQuote: tweetItem.is_quote,
							IsReply: tweetItem.is_reply,
							IsPinned: tweetItem.is_pinned,
							HasLiked: tweetItem.has_liked,
							HasRetweeted: tweetItem.has_retweeted,
							CreatedAt: tweetItem.created_at,
						} as TweetInfo;

						if (tweetItem.content) {
							tweet.Content = tweetItem.content;
						}

						if (tweetItem.code) {
							tweet.Code = tweetItem.code;
						}

						if (tweetItem.media) {
							tweet.Media = {
								type: tweetItem.media.type as MediaTypes,
								url: tweetItem.media.url,
							};
						}

						const ret = {
							Tweet: tweet,
						} as TweetNode;

						if (node.original_tweet) {
							const originalTweetItem = node.original_tweet;
							const originalTweet = {
								TweetId: originalTweetItem.tweet_id,
								UserInfo: {
									UserId: originalTweetItem.user_info.user_id,
									UserName:
										originalTweetItem.user_info.user_name,
									ProfileImageUrl:
										originalTweetItem.user_info
											.profile_image_url,
									IsPrivate:
										originalTweetItem.user_info.is_private,
									IsAdmin:
										originalTweetItem.user_info.is_admin,
								} as UserInfoWithoutBio,
								LikesCount: originalTweetItem.likes_count,
								RetweetsCount: originalTweetItem.retweets_count,
								RepliesCount: originalTweetItem.replies_count,
								IsQuote: originalTweetItem.is_quote,
								IsReply: originalTweetItem.is_reply,
								IsPinned: originalTweetItem.is_pinned,
								HasLiked: originalTweetItem.has_liked,
								HasRetweeted: originalTweetItem.has_retweeted,
								CreatedAt: originalTweetItem.created_at,
							} as TweetInfo;

							if (originalTweetItem.content) {
								originalTweet.Content =
									originalTweetItem.content;
							}

							if (originalTweetItem.code) {
								originalTweet.Code = originalTweetItem.code;
							}

							if (originalTweetItem.media) {
								originalTweet.Media = {
									type: originalTweetItem.media
										.type as MediaTypes,
									url: originalTweetItem.media.url,
								};
							}

							ret.OriginalTweet = originalTweet;
						}

						if (node.parent_reply) {
							const parentReplyItem = node.parent_reply;
							const parentReply = {
								TweetId: parentReplyItem.tweet_id,
								UserInfo: {
									UserId: parentReplyItem.user_info.user_id,
									UserName:
										parentReplyItem.user_info.user_name,
									ProfileImageUrl:
										parentReplyItem.user_info
											.profile_image_url,
									IsPrivate:
										parentReplyItem.user_info.is_private,
									IsAdmin: parentReplyItem.user_info.is_admin,
								} as UserInfoWithoutBio,
								LikesCount: parentReplyItem.likes_count,
								RetweetsCount: parentReplyItem.retweets_count,
								RepliesCount: parentReplyItem.replies_count,
								IsQuote: parentReplyItem.is_quote,
								IsReply: parentReplyItem.is_reply,
								IsPinned: parentReplyItem.is_pinned,
								HasLiked: parentReplyItem.has_liked,
								HasRetweeted: parentReplyItem.has_retweeted,
								CreatedAt: parentReplyItem.created_at,
							} as TweetInfo;

							if (parentReplyItem.content) {
								parentReply.Content = parentReplyItem.content;
							}

							if (parentReplyItem.code) {
								parentReply.Code = parentReplyItem.code;
							}

							if (parentReplyItem.media) {
								parentReply.Media = {
									type: parentReplyItem.media
										.type as MediaTypes,
									url: parentReplyItem.media.url,
								};
							}

							ret.ParentReply = parentReply;
						}

						if (node.omitted_reply_exist) {
							ret.OmittedReplyExist = true;
						}

						return ret;
					});

					setTweets(tweetList);
				}
			} catch (err) {
				console.error(err);
				setError("ユーザーのツイートの取得に失敗しました");
			} finally {
				setLoading(false);
			}
		};
		fetchUserTweets();
	}, []);

	return { tweets, loading, error };
}
