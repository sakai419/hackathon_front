import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function EmailInput({ value, onChange }: EmailInputProps) {
	return (
		<div className="space-y-2">
			<Label htmlFor="email">メールアドレス</Label>
			<Input
				id="email"
				type="email"
				placeholder="name@example.com"
				required
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}
