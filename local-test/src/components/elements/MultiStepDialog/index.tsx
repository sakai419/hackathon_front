import React, { useState, useTransition } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Step<T> {
	title: string;
	content: (
		data: T,
		updateData: (newData: Partial<T>) => void
	) => React.ReactNode;
	validate?: (data: T) => boolean;
}

interface MultiStepDialogProps<T> {
	steps: Step<T>[];
	initialData: T;
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: T) => Promise<any>;
}

export function MultiStepDialog<T>({
	steps,
	initialData,
	isOpen,
	onClose,
	onSubmit,
}: MultiStepDialogProps<T>) {
	const [currentStep, setCurrentStep] = useState(0);
	const [formData, setFormData] = useState<T>(initialData);
	const [isPending, startTransition] = useTransition();

	const updateData = (newData: Partial<T>) => {
		setFormData((prevData) => ({ ...prevData, ...newData }));
	};

	const handleNext = () => {
		if (
			currentStep < steps.length - 1 &&
			(!steps[currentStep].validate ||
				steps[currentStep].validate(formData))
		) {
			setCurrentStep(currentStep + 1);
		}
	};

	const handleBack = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const handleClose = () => {
		setCurrentStep(0);
		setFormData(initialData);
		onClose();
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (
			!steps[currentStep].validate ||
			steps[currentStep].validate(formData)
		) {
			startTransition(async () => {
				const result = await onSubmit(formData);
				if (result.success) {
					handleClose();
				} else {
					// エラー処理
					console.error(result.error);
				}
			});
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>{steps[currentStep].title}</DialogTitle>
					</DialogHeader>
					<div className="py-4">
						{steps[currentStep].content(formData, updateData)}
					</div>
					<DialogFooter className="flex justify-between items-center">
						<div className="flex space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={handleBack}
								disabled={currentStep === 0 || isPending}
							>
								戻る
							</Button>
							{currentStep === steps.length - 1 ? (
								<Button type="submit" disabled={isPending}>
									{isPending && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									完了
								</Button>
							) : (
								<Button
									type="button"
									onClick={handleNext}
									disabled={
										isPending ||
										(steps[currentStep].validate &&
											!steps[currentStep].validate(
												formData
											))
									}
								>
									次へ
								</Button>
							)}
						</div>
						<div className="text-sm text-gray-500">
							{currentStep + 1} / {steps.length}
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
