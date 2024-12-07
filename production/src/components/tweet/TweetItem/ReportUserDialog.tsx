"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	RadioGroup,
	RadioGroupItem,
	Textarea,
} from "@/components/ui";
import { ErrorMessage } from "@/components/common";
import { ReportReason } from "@/types/report";

interface ReportUserDialogProps {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	onSubmit: (reason: ReportReason, content?: string) => Promise<void>;
}

const reportReasons = [
	{ value: "spam", label: "スパム" },
	{ value: "harassment", label: "ハラスメント" },
	{ value: "inappropriate_content", label: "不適切なコンテンツ" },
	{ value: "other", label: "その他" },
] as const;

const formSchema = z.object({
	reason: z.enum(["spam", "harassment", "inappropriate_content", "other"]),
	description: z
		.string()
		.max(500)
		.optional()
		.refine(
			(val) => {
				if (val === "other") {
					return val !== undefined && val.trim() !== "";
				}
				return true;
			},
			{
				message:
					"その他の理由を選択した場合は、詳細な説明を入力してください。",
			}
		),
});

export default function ReportUserDialog({
	isOpen,
	setIsOpen,
	onSubmit: handleSubmit,
}: ReportUserDialogProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<unknown>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			reason: "spam",
			description: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setIsSubmitting(true);
		try {
			await handleSubmit(data.reason, data.description);
			toast({ description: "通報が完了しました。", variant: "default" });
			setIsOpen(false);
		} catch (error) {
			setError(error);
			toast({
				description: "通報中にエラーが発生しました。",
				variant: "destructive",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>ユーザーを通報</DialogTitle>
					<DialogDescription>
						問題のあるユーザーを通報してください。すべての報告は匿名で処理されます。
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8"
					>
						<FormField
							control={form.control}
							name="reason"
							render={({ field }) => (
								<FormItem className="space-y-3">
									<FormLabel>通報理由</FormLabel>
									<FormControl>
										<RadioGroup
											onValueChange={field.onChange}
											defaultValue={field.value}
											className="flex flex-col space-y-1"
										>
											{reportReasons.map((reason) => (
												<FormItem
													className="flex items-center space-x-3 space-y-0"
													key={reason.value}
												>
													<FormControl>
														<RadioGroupItem
															value={reason.value}
														/>
													</FormControl>
													<FormLabel className="font-normal">
														{reason.label}
													</FormLabel>
												</FormItem>
											))}
										</RadioGroup>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>詳細な説明（任意）</FormLabel>
									<FormControl>
										<Textarea
											placeholder="通報の詳細を記入してください。"
											className="resize-none"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							disabled={
								isSubmitting ||
								(form.watch("reason") === "other" &&
									form.watch("description") === "")
							}
						>
							{isSubmitting ? "送信中..." : "通報する"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
