import React, { useState } from "react";
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui";
import {
	MoreHorizontal,
	Trash2,
	Pin,
	UserPlus,
	UserX,
	Flag,
	Undo,
} from "lucide-react";

interface TweetOptionsButtonProps {
	isAuthor: boolean;
	userId: string;
	isPinned?: boolean;
}

export function TweetOptionsButton({
	isAuthor,
	userId,
	isPinned,
}: TweetOptionsButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	const handleDeleteClick = () => {
		console.log("Delete tweet");
		setIsOpen(false);
	};

	const handlePinClick = () => {
		console.log("Pin tweet to profile");
		setIsOpen(false);
	};

	const handleFollowClick = () => {
		console.log(`Follow @${userId}`);
		setIsOpen(false);
	};

	const handleBlockClick = () => {
		console.log(`Block @${userId}`);
		setIsOpen(false);
	};

	const handleReportClick = () => {
		console.log(`Report @${userId}`);
		setIsOpen(false);
	};

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="sm"
					className="hover:bg-gray-200 hover:text-gray-800"
				>
					<MoreHorizontal className="w-4 h-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<div className="flex flex-col">
					{isAuthor ? (
						<>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleDeleteClick}
							>
								<Trash2
									className="w-4 h-4 font-semibold"
									color="red"
								/>
								<span className="text-red-500 font-semibold">
									削除
								</span>
							</Button>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handlePinClick}
							>
								{isPinned ? (
									<>
										<Undo className="w-4 h-4 font-semibold" />
										<span className="font-semibold">
											ピン留めを解除する
										</span>
									</>
								) : (
									<>
										<Pin className="w-4 h-4 font-semibold" />
										<span className="font-semibold">
											プロフィールにピン留めする
										</span>
									</>
								)}
							</Button>
						</>
					) : (
						<>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleFollowClick}
							>
								<UserPlus className="w-4 h-4 font-semibold" />
								<span className="font-semibold">
									@{userId}さんをフォロー
								</span>
							</Button>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleBlockClick}
							>
								<UserX className="w-4 h-4 font-semibold" />
								<span className="font-semibold">
									@{userId}さんをブロック
								</span>
							</Button>
							<Button
								variant="ghost"
								className="flex items-center justify-start space-x-2 w-full"
								onClick={handleReportClick}
							>
								<Flag className="w-4 h-4 font-semibold" />
								<span className="font-semibold">
									@{userId}さんを通報
								</span>
							</Button>
						</>
					)}
				</div>
			</PopoverContent>
		</Popover>
	);
}
