"use client";

import { ArrowLeft, Lock, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Profile } from "@/types/profile";
import formatYearMonth from "@/lib/utils/formatYearMonth";

interface UserProfileProps {
	profile: Profile;
}

export default function UserHeader({ profile }: UserProfileProps) {
	const bannerImage = profile.BannerImageUrl || "/images/default_image.png";
	const profileImage =
		profile.UserInfo.profileImageUrl || "/images/default_image.png";
	const Date = formatYearMonth(profile.CreatedAt);

	return (
		<div className="relative">
			{/* Header */}
			<div className="flex items-center gap-6 p-4 h-14">
				<Link href="/" className="hover:opacity-70">
					<ArrowLeft className="h-5 w-5" />
				</Link>
				<div className="flex flex-col">
					<div className="flex items-center gap-1">
						<span className="font-bold">
							{profile.UserInfo.userId}
						</span>
						<Lock className="h-4 w-4" />
					</div>
					<span className="text-sm text-muted-foreground">
						{profile.TweetCount}件のポスト
					</span>
				</div>
			</div>

			{/* Banner & Avatar */}
			<div className="relative">
				<div className="h-48 bg-muted">
					<img
						src={bannerImage}
						alt=""
						className="w-full h-full object-cover"
					/>
				</div>
				<div className="absolute -bottom-12 left-4">
					<Avatar className="w-24 h-24 border-4 border-background">
						<AvatarImage
							src={profileImage}
							alt={`${profile.UserInfo.userName}のプロフィール画像`}
						/>
						<AvatarFallback>
							{profile.UserInfo.userName?.charAt(0)}
						</AvatarFallback>
					</Avatar>
				</div>
				<div className="absolute right-4 bottom-4">
					<Button
						variant="outline"
						className="bg-background font-bold"
					>
						プロフィールを設定
					</Button>
				</div>
			</div>

			{/* Profile Info */}
			<div className="mt-14 px-4 space-y-3">
				<div>
					<div className="flex items-center gap-1">
						<span className="text-xl font-bold">
							{profile.UserInfo.userId}
						</span>
						<Lock className="h-4 w-4" />
					</div>
					<div className="text-muted-foreground">
						@{profile.UserInfo.userName}
					</div>
				</div>

				{profile.UserInfo.bio && <div>{profile.UserInfo.bio}</div>}

				<div className="flex items-center gap-2 text-muted-foreground">
					<Calendar className="h-4 w-4" />
					<span>{Date}からTwitterを利用しています</span>
				</div>

				<div className="flex gap-4 text-sm">
					<div>
						<span className="font-bold text-foreground">
							{profile.FollowingCount}
						</span>
						<span className="text-muted-foreground ml-1">
							フォロー中
						</span>
					</div>
					<div>
						<span className="font-bold text-foreground">
							{profile.FollowerCount}
						</span>
						<span className="text-muted-foreground ml-1">
							フォロワー
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
