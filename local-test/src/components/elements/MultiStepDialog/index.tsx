import React, { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Step {
	title: string;
	content: React.ReactNode;
}

interface MultiStepDialogProps {
	steps: Step[];
	isOpen: boolean;
	onClose: () => void;
}

export function MultiStepDialog({
	steps,
	isOpen,
	onClose,
}: MultiStepDialogProps) {
	const [currentStep, setCurrentStep] = useState(0);

	const handleNext = () => {
		if (currentStep < steps.length - 1) {
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
		onClose();
	};

	return (
		<Dialog open={isOpen} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{steps[currentStep].title}</DialogTitle>
				</DialogHeader>
				<div className="py-4">{steps[currentStep].content}</div>
				<DialogFooter className="flex justify-between items-center">
					<div className="flex space-x-2">
						<Button
							variant="outline"
							onClick={handleBack}
							disabled={currentStep === 0}
						>
							戻る
						</Button>
						<Button
							onClick={handleNext}
							disabled={currentStep === steps.length - 1}
						>
							次へ
						</Button>
					</div>
					<div className="text-sm text-gray-500">
						{currentStep + 1} / {steps.length}
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
