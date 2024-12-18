import { useCallback, useEffect, useState } from "react";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui";
import { ConversationList } from "./components/ConversationList";
import { Conversation } from "@/types/conversation";
import useConversation from "@/hooks/useConversation";
import LoadingScreen from "@/components/common/LoadingScreen";
import MessageArea from "./components/MessageArea";
import { ErrorMessage } from "@/components/common";

export function MessagePage() {
	const [selectedConversation, setSelectedConversation] =
		useState<Conversation | null>(null);
	const [conversationList, setConversationList] = useState<Conversation[]>(
		[]
	);

	const {
		conversations,
		isLoading: isConversationLoading,
		hasMore: hasMoreConversations,
		loadMore: loadMoreConversations,
		error: conversationError,
	} = useConversation();

	const updateConversation = useCallback(
		(conversation: Conversation, updateFiled: Partial<Conversation>) => {
			setConversationList((prev) =>
				prev.map((c) =>
					c.id === conversation.id ? { ...c, ...updateFiled } : c
				)
			);
		},
		[]
	);

	const handleSelectConversation = (conversation: Conversation) => {
		setSelectedConversation(conversation);
	};

	useEffect(() => {
		setConversationList(conversations);
	}, [conversations]);

	if (conversationError) {
		return <ErrorMessage error={conversationError} />;
	}

	return (
		<div className="flex h-screen">
			<Card className="w-1/3 border-r max-w-[300px]">
				<CardHeader>
					<CardTitle>メッセージ</CardTitle>
				</CardHeader>
				<CardContent>
					{isConversationLoading && <LoadingScreen />}
					<ConversationList
						conversations={conversationList}
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
				<MessageArea
					selectedConversation={selectedConversation}
					setSelectedConversation={setSelectedConversation}
					updateConversation={updateConversation}
				/>
			) : (
				<div className="w-full flex items-center justify-center">
					<p className="text-muted-foreground">
						ユーザーを選択してメッセージを開始してください。
					</p>
				</div>
			)}
		</div>
	);
}
