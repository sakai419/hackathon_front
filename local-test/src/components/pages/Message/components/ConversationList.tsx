import UserAvatar from "@/components/common/UserAvatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Conversation } from "@/types/conversation";

interface ConversationListProps {
	conversations: Conversation[];
	onSelectConversation: (conversation: Conversation) => void;
}

export function ConversationList({
	conversations,
	onSelectConversation,
}: ConversationListProps) {
	return (
		<ScrollArea className="h-[600px]">
			<div className="space-y-4">
				{conversations.map((conversation) => (
					<div
						key={conversation.id}
						className="flex items-center space-x-4 cursor-pointer hover:bg-accent rounded-lg p-2"
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
					</div>
				))}
			</div>
		</ScrollArea>
	);
}
