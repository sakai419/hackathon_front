import { ButtonWithTooltip } from "@/components/common";
import { ErrorMessage } from "@/components/common";
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Label,
	Textarea,
} from "@/components/ui";
import sendMessage from "@/services/api/conversations/sendMessage";
import { MailIcon } from "lucide-react";
import { useState } from "react";

interface SendMessageButtonProps {
	userId: string;
}

export default function SendMessageButton({ userId }: SendMessageButtonProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState<unknown>(null);

	const handleClose = () => {
		setMessage("");
		setIsOpen(false);
	};

	const handleSend = async () => {
		try {
			await sendMessage(userId, message);
			handleClose();
		} catch (error) {
			setError(error);
		}
	};

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<>
			<ButtonWithTooltip
				description="メッセージを送信"
				buttonProps={{
					onClick: () => setIsOpen(true),
					className:
						"bg-white text-gray-500 hover:text-gray-700 p-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-400",
					size: "icon",
				}}
				content={<MailIcon />}
			/>
			<Dialog open={isOpen} onOpenChange={handleClose}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>メッセージを送信</DialogTitle>
						<DialogDescription>
							ユーザーにメッセージを送信します。以下のフォームに内容を入力してください。
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="items-center flex-col space-y-2">
							<Label htmlFor="message" className="text-right">
								メッセージ
							</Label>
							<Textarea
								id="message"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className="col-span-3"
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="secondary"
							onClick={() => setIsOpen(false)}
						>
							キャンセル
						</Button>
						<Button type="button" onClick={handleSend}>
							送信
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
