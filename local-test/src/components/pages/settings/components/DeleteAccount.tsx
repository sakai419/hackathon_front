"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DeleteAccount() {
	const [confirmText, setConfirmText] = useState("");

	const handleDeleteAccount = () => {
		// ここでアカウント削除のAPIを呼び出す
		console.log("Account deleted");
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>アカウントの削除</CardTitle>
			</CardHeader>
			<CardContent>
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<Button variant="destructive">アカウントを削除</Button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>
								本当にアカウントを削除しますか？
							</AlertDialogTitle>
							<AlertDialogDescription>
								この操作は取り消せません。すべてのデータが永久に削除されます。
								確認のため、以下に「delete」と入力してください。
							</AlertDialogDescription>
						</AlertDialogHeader>
						<div className="space-y-2">
							<Label htmlFor="confirm-delete">確認</Label>
							<Input
								id="confirm-delete"
								value={confirmText}
								onChange={(e) => setConfirmText(e.target.value)}
								placeholder="delete"
							/>
						</div>
						<AlertDialogFooter>
							<AlertDialogCancel>キャンセル</AlertDialogCancel>
							<AlertDialogAction
								onClick={handleDeleteAccount}
								disabled={confirmText !== "delete"}
							>
								削除
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</CardContent>
		</Card>
	);
}
