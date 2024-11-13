import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import UserAvatar from "../UserAvatar";
import { useState, useRef } from "react";
import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";

interface TweetDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onTweet: (content: string, mediaUrl?: string) => Promise<void>;
	userInfo?: UserInfoWithoutBio;
}

export default function TweetDialog({
	isOpen,
	onClose,
	onTweet,
	userInfo,
}: TweetDialogProps) {
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [mediaFile, setMediaFile] = useState<File | null>(null);
	const [mediaPreview, setMediaPreview] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleMediaClick = () => {
		fileInputRef.current?.click();
	};

	const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setMediaFile(file);
			const previewUrl = URL.createObjectURL(file);
			setMediaPreview(previewUrl);
		}
	};

	const removeMedia = () => {
		setMediaFile(null);
		setMediaPreview(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleTweet = async () => {
		if (!content.trim() && !mediaFile) return;

		setIsLoading(true);
		try {
			// ここで実際のメディアアップロードとツイート投稿を行う
			await onTweet(content, mediaPreview || undefined);
			setContent("");
			setMediaFile(null);
			setMediaPreview(null);
			onClose();
		} catch (error) {
			console.error("Failed to post tweet:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const profileImage =
		userInfo?.ProfileImageUrl || "/images/default_image.png";

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle className="sr-only">
						ツイートを作成
					</DialogTitle>
				</DialogHeader>
				<div className="flex space-x-4">
					<UserAvatar
						withLink={false}
						userId={userInfo?.UserId || ""}
						src={profileImage}
						alt={userInfo?.UserName || ""}
						size="w-12 h-12"
					/>
					<div className="flex-1 space-y-4">
						<Textarea
							placeholder="いまどうしてる？"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="min-h-[100px] resize-none border-none focus-visible:ring-0 text-lg"
						/>
						{mediaPreview && (
							<div className="relative">
								<Image
									src={mediaPreview}
									alt="アップロード画像"
									width={500}
									height={300}
									className="rounded-xl object-cover max-h-[300px] w-full"
								/>
								<Button
									size="icon"
									variant="secondary"
									className="absolute top-2 right-2 rounded-full bg-black/50 hover:bg-black/70"
									onClick={removeMedia}
								>
									<X className="h-4 w-4 text-white" />
								</Button>
							</div>
						)}
					</div>
				</div>
				<div className="flex justify-between items-center mt-4">
					<div className="flex items-center">
						<input
							type="file"
							ref={fileInputRef}
							onChange={handleMediaChange}
							accept="image/*"
							className="hidden"
						/>
						<Button
							size="icon"
							variant="ghost"
							className="text-primary hover:bg-primary/10 rounded-full"
							onClick={handleMediaClick}
						>
							<ImageIcon className="h-5 w-5" />
						</Button>
					</div>
					<Button
						onClick={handleTweet}
						disabled={(!content.trim() && !mediaFile) || isLoading}
						className="rounded-full px-6"
					>
						{isLoading ? "投稿中..." : "ポストする"}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
