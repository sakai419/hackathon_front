import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SidebarContent from "./SidebarContent";
import UserInfo from "./UserInfo";
import { UserWithoutBio } from "@/types/userWithoutBio";
import TweetButton from "./TweetButton";
import TweetDialog from "./TweetDialog";
import useUserWithoutBio from "@/hooks/useUserWithoutBio";
import { useSidebarInfo } from "@/hooks/useSidebarInfo";
import { SidebarInfo } from "@/types/sidebar";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	const { sidebarInfo, loading, error } = useSidebarInfo();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleOpenDialog = () => setIsDialogOpen(true);
	const handleCloseDialog = () => setIsDialogOpen(false);

	const handleTweet = (content: string) => {
		console.log("ツイート内容:", content);
	};

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
					<SidebarContent />
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
						{sidebarInfo && (
							<UserInfo user={sidebarInfo?.userInfo} />
						)}
					</div>
				</div>
			</div>
		</>
	);
}
