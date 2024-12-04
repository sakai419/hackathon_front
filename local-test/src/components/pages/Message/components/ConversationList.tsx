import UserAvatar from "@/components/user/UserAvatar";
import { ScrollArea } from "@/components/ui";
import { Conversation } from "@/types/conversation";
import useClientProfile from "@/hooks/useClientProfile";
import { LoadingScreen } from "@/components/common";

interface ConversationListProps {
	conversations: Conversation[];
	onSelectConversation: (conversation: Conversation) => void;
}

export function ConversationList({
	conversations,
	onSelectConversation,
}: ConversationListProps) {
	const { profile, isLoading, error } = useClientProfile();

	if (error) {
		return <div>エラーが発生しました</div>;
	}

	return (
		<>
			{isLoading && <LoadingScreen />}
			<ScrollArea className="h-[600px]">
				<div className="space-y-4">
					{conversations.map((conversation) => (
						<div
							key={conversation.id}
							className={`flex items-center space-x-4 cursor-pointer hover:bg-accent rounded-lg p-2 relative ${
								!conversation.isRead &&
								conversation.senderUserId !==
									profile?.userInfo.userId
									? "bg-accent/50"
									: ""
							}`}
							onClick={() => onSelectConversation(conversation)}
						>
							<UserAvatar
								userId={conversation.opponentInfo.userId}
								src={conversation.opponentInfo.profileImageUrl}
								alt={conversation.opponentInfo.userName}
								size="w-10 h-10"
							/>
							<div className="flex-1 space-y-1">
								<p className="text-sm font-medium leading-none">
									{conversation.opponentInfo.userName}
								</p>
								<p className="text-sm text-muted-foreground">
									{conversation.content}
								</p>
							</div>
							{!conversation.isRead &&
								conversation.senderUserId !==
									profile?.userInfo.userId && (
									<div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/80" />
								)}
						</div>
					))}
				</div>
			</ScrollArea>
		</>
	);
}
