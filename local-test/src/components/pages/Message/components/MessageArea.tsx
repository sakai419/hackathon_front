import { ErrorMessage, LoadingScreen } from "@/components/common";
import {
	Card,
	CardHeader,
	Button,
	CardTitle,
	CardContent,
	ScrollArea,
	Input,
} from "@/components/ui";
import { UserAvatar } from "@/components/user";
import useMessages from "@/hooks/useMessages";
import { getRelativeTimeString } from "@/lib/utils/getRelativeTimeString";
import { validateMessage } from "@/lib/utils/validation";
import markMessagesAsRead from "@/services/api/conversations/markMessagesAsRead";
import sendMessage from "@/services/api/conversations/sendMessage";
import { Conversation } from "@/types/conversation";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MessageAreaProps {
	selectedConversation: Conversation;
	setSelectedConversation: (conversation: Conversation | null) => void;
	updateConversation: (
		conversation: Conversation,
		updateFiled: Partial<Conversation>
	) => void;
}

export default function MessageArea({
	selectedConversation,
	setSelectedConversation,
	updateConversation,
}: MessageAreaProps) {
	const [message, setMessage] = useState("");
	const [userId, setUserId] = useState("");
	const scrollAreaRef = useRef<HTMLDivElement>(null);

	const {
		messages,
		isLoading: isMessageLoading,
		hasMore: hasMoreMessages,
		loadMore: loadMoreMessages,
		error: messageError,
	} = useMessages({
		userId: userId,
	});

	const setScrollToBottom = () => {
		if (scrollAreaRef.current) {
			scrollAreaRef.current.scrollTop =
				scrollAreaRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		setScrollToBottom();
	}, [messages]);

	useEffect(() => {
		async function markAsRead() {
			if (selectedConversation) {
				try {
					updateConversation(selectedConversation, { isRead: true });
					await markMessagesAsRead(
						selectedConversation.opponentInfo.userId
					);
				} catch (error) {
					console.error("Failed to mark messages as read:", error);
				}
			}
		}

		markAsRead();
	}, [selectedConversation, updateConversation]);

	useEffect(() => {
		setUserId(selectedConversation.opponentInfo.userId);
	}, [selectedConversation]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await sendMessage(userId, message);
			messages.unshift({
				id:
					messages.reduce((maxId, message) => {
						return maxId > message.id ? maxId : message.id;
					}, 0) + 1,
				content: message,
				senderUserId: "me",
				createdAt: new Date().toISOString(),
				isRead: false,
			});
		} catch (error) {
			console.error("Failed to send message:", error);
		} finally {
			setMessage("");
			setScrollToBottom();
		}
	};

	if (messageError) {
		return <ErrorMessage error={messageError} />;
	}

	return (
		<Card className="w-full">
			{isMessageLoading && <LoadingScreen />}
			<CardHeader className="flex flex-row items-center gap-4 p-4">
				<Button
					variant="ghost"
					size="icon"
					aria-label="戻る"
					onClick={() => setSelectedConversation(null)}
				>
					<ArrowLeft className="h-4 w-4" />
				</Button>
				<UserAvatar
					userId={selectedConversation.opponentInfo.userId}
					src={selectedConversation.opponentInfo.profileImageUrl}
					alt={selectedConversation.opponentInfo.userName}
					size="w-9 h-9"
				/>
				<CardTitle>
					{selectedConversation.opponentInfo.userName}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-4">
				<ScrollArea
					ref={scrollAreaRef}
					className="h-[calc(100vh-200px)] mb-4"
				>
					<Button
						onClick={loadMoreMessages}
						disabled={!hasMoreMessages || isMessageLoading}
						className="w-full"
					>
						{hasMoreMessages
							? "さらに読み込む"
							: "これ以上メッセージはありません"}
					</Button>
					<div className="flex flex-col-reverse pr-4">
						{messages.map((message) => {
							const isOpponentMessage =
								message.senderUserId ===
								selectedConversation.opponentInfo.userId;
							const createdAtDate = new Date(message.createdAt);
							return (
								<div
									key={message.id}
									className={`flex flex-col mt-4 ${
										isOpponentMessage
											? "items-start"
											: "items-end"
									}`}
								>
									<div
										className={`${
											isOpponentMessage
												? "bg-secondary text-secondary-foreground"
												: "bg-primary text-primary-foreground"
										} rounded-lg p-2 max-w-[80%] break-words`}
									>
										<div className="max-w-[300px]">
											{message.content}
										</div>
									</div>
									<div className="flex space-x-1 items-center justify-center text-center">
										<div
											className={
												"text-xs mt-1 text-secondary-foreground"
											}
										>
											{getRelativeTimeString(
												createdAtDate
											)}
										</div>
										{!isOpponentMessage &&
											message.isRead && (
												<div className="text-xs mt-1 text-green-500">
													既読
												</div>
											)}
									</div>
								</div>
							);
						})}
					</div>
				</ScrollArea>
				<form
					onSubmit={handleSubmit}
					className="flex items-center gap-2"
				>
					<Input
						type="text"
						placeholder="メッセージを入力..."
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						className="flex-grow"
						aria-label="メッセージ入力"
					/>
					<Button
						type="submit"
						size="icon"
						aria-label="送信"
						disabled={!validateMessage(message)}
					>
						<Send className="h-4 w-4" />
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
