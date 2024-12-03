import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui";

interface FormCardProps {
	title: string;
	description: string;
	content: React.ReactNode;
	footer: React.ReactNode;
}

export default function FormCard({
	title,
	description,
	content,
	footer,
}: FormCardProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<Card className="w-full max-w-md mx-auto">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold text-center">
						{title}
					</CardTitle>
					<p className="text-sm text-muted-foreground text-center">
						{description}
					</p>
				</CardHeader>
				<CardContent>{content}</CardContent>
				<CardFooter>{footer}</CardFooter>
			</Card>
		</div>
	);
}
