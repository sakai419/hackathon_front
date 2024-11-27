"use client";

import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { useSidebarInfo } from "@/hooks/useSidebarInfo";
import TweetDialog from "@/components/common/TweetDialog";
import SidebarContent from "./components/SidebarContent";
import TweetButton from "./components/TweetButton";
import UserInfo from "./components/UserInfo";
import { Code, Media } from "@/types/tweetInfo";
import postTweet from "@/services/api/tweets/postTweet";
import { useClientProfileContext } from "@/context/ClientProfileProvider";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const { sidebarInfo, isLoading, error } = useSidebarInfo();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const clientProfile = useClientProfileContext().profile;

	const handleOpenDialog = () => setIsDialogOpen(true);
	const handleCloseDialog = () => setIsDialogOpen(false);

	const handleTweet = async (content: string, code?: Code, media?: Media) => {
		try {
			await postTweet({
				content,
				code,
				media,
			});
			handleCloseDialog();
		} catch (error) {
			throw error;
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div className="z-50">
			<Button
				variant="outline"
				size="icon"
				className="fixed top-4 left-4 z-50 md:hidden"
				onClick={() => setIsOpen(!isOpen)}
				aria-label={isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}
			>
				<MenuIcon className="h-4 w-4" />
			</Button>
			<div
				className={`fixed top-0 left-0 h-full bg-background p-4 shadow-lg transition-all duration-300 ease-in-out ${
					isOpen ? "w-72" : "w-0 md:w-72"
				}`}
			>
				<div
					className={`flex flex-col h-full overflow-hidden ${
						isOpen ? "w-64" : "w-0 md:w-64"
					}`}
				>
					<SidebarContent
						unreadConversationCount={
							sidebarInfo?.unreadConversationCount
						}
						unreadNotificationCount={
							sidebarInfo?.unreadNotificationCount
						}
						userId={clientProfile?.userInfo.userId}
					/>
					<TweetButton
						onClick={handleOpenDialog}
						className="mt-auto"
					/>
					<TweetDialog
						isOpen={isDialogOpen}
						onClose={handleCloseDialog}
						onTweet={handleTweet}
					/>
					<div className="mt-auto">
						{clientProfile && (
							<UserInfo user={clientProfile?.userInfo} />
						)}
					</div>
					{error && <div>{error}</div>}
				</div>
			</div>
		</div>
	);
}
