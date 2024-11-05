import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EmailInput() {
	return (
		<div className="space-y-2">
			<Label htmlFor="email">メールアドレス</Label>
			<Input
				id="email"
				type="email"
				placeholder="name@example.com"
				required
			/>
		</div>
	);
}
