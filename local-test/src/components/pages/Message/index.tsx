import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { ConversationList } from "./components/ConversationList";
import { Conversation } from "@/types/conversation";
import useConversation from "@/hooks/useConversation";
import useMessages from "@/hooks/useMessages";
import LoadingScreen from "@/components/common/LoadingScreen";
import UserAvatar from "@/components/common/UserAvatar";

export function MessagePage() {
	const [message, setMessage] = useState("");
	const [selectedConversation, setSelectedConversation] =
		useState<Conversation | null>(null);

	const {
		conversations,
		isLoading: isConversationLoading,
		hasMore: hasMoreConversations,
		loadMore: loadMoreConversations,
		error: conversationError,
	} = useConversation();
	const {
		messages,
		isLoading: isMessageLoading,
		hasMore: hasMoreMessages,
		loadMore: loadMoreMessages,
		error: messageError,
	} = useMessages(selectedConversation?.opponentInfo.userId || "");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Message sent:", message);
		setMessage("");
	};

	const handleSelectConversation = (conversation: Conversation) => {
		setSelectedConversation(conversation);
	};

	if (conversationError || messageError) {
		const errorMessage = conversationError || messageError;
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-red-500">{errorMessage}</p>
			</div>
		);
	}

	return (
		<div className="flex h-screen">
			<Card className="w-1/3 border-r">
				<CardHeader>
					<CardTitle>メッセージ</CardTitle>
				</CardHeader>
				<CardContent>
					{isConversationLoading && <LoadingScreen />}
					<ConversationList
						conversations={conversations}
						onSelectConversation={handleSelectConversation}
					/>
					<Button
						onClick={loadMoreConversations}
						disabled={
							!hasMoreConversations || isConversationLoading
						}
						className="w-full"
					>
						{hasMoreConversations
							? "さらに読み込む"
							: "これ以上メッセージはありません"}
					</Button>
				</CardContent>
			</Card>

			{selectedConversation ? (
				<Card className="w-2/3">
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
							src={
								selectedConversation.opponentInfo
									.profileImageUrl
							}
							alt={selectedConversation.opponentInfo.userName}
							size="w-9 h-9"
						/>
						<CardTitle>
							{selectedConversation.opponentInfo.userName}
						</CardTitle>
					</CardHeader>
					<CardContent className="p-4">
						<ScrollArea className="h-[500px] mb-4">
							<Button
								onClick={loadMoreMessages}
								disabled={!hasMoreMessages || isMessageLoading}
								className="w-full"
							>
								{hasMoreMessages
									? "さらに読み込む"
									: "これ以上メッセージはありません"}
							</Button>
							{messages.map((message) => (
								<div
									key={message.id}
									className={`flex mt-4 ${
										message.senderUserId ===
										selectedConversation.opponentInfo.userId
											? "justify-start"
											: "justify-end"
									}`}
								>
									<div
										className={`${
											message.senderUserId ===
											selectedConversation.opponentInfo
												.userId
												? "bg-secondary text-secondary-foreground"
												: "bg-primary text-primary-foreground"
										} rounded-lg p-2 max-w-[80%]`}
									>
										{message.content}
									</div>
								</div>
							))}
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
							<Button type="submit" size="icon" aria-label="送信">
								<Send className="h-4 w-4" />
							</Button>
						</form>
					</CardContent>
				</Card>
			) : (
				<div className="w-2/3 flex items-center justify-center">
					<p className="text-muted-foreground">
						ユーザーを選択してメッセージを開始してください。
					</p>
				</div>
			)}
		</div>
	);
}
