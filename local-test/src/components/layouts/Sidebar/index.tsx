import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { useSidebarInfo } from "@/hooks/useSidebarInfo";
import TweetDialog from "@/components/common/TweetDialog";
import SidebarContent from "./components/SidebarContent";
import TweetButton from "./components/TweetButton";
import UserInfo from "./components/UserInfo";
import { Media } from "@/types/tweetInfo";
import postTweet from "@/services/api/tweets/postTweet";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const { sidebarInfo, loading, error } = useSidebarInfo();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleOpenDialog = () => setIsDialogOpen(true);
	const handleCloseDialog = () => setIsDialogOpen(false);

	const handleTweet = async (content: string, media?: Media) => {
		try {
			await postTweet({
				content,
				code: "",
				mediaUrl: media?.url,
			});
			handleCloseDialog();
		} catch (error) {
			console.log("Failed to post tweet:", error);
			throw error;
		}
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<>
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
						userId={sidebarInfo?.userInfo.userId}
					/>
					<TweetButton
						onClick={handleOpenDialog}
						className="mt-auto"
					/>
					<TweetDialog
						isOpen={isDialogOpen}
						onClose={handleCloseDialog}
						onTweet={handleTweet}
						userInfo={sidebarInfo?.userInfo}
					/>
					<div className="mt-auto">
						{sidebarInfo && (
							<UserInfo user={sidebarInfo?.userInfo} />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
