import { Search } from "lucide-react";
import { Input } from "@/components/ui";

interface SearchFormProps {
	keyword: string;
	setKeyword: (keyword: string) => void;
	onSubmit: (e: React.FormEvent) => void;
}

export default function SearchForm({
	keyword,
	setKeyword,
	onSubmit,
}: SearchFormProps) {
	return (
		<form className="p-4 w-full bg-background" onSubmit={onSubmit}>
			<div className="relative">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
				<Input
					type="search"
					value={keyword}
					onChange={(e) => setKeyword(e.target.value)}
					placeholder="検索"
					className="pl-10 bg-muted"
				/>
			</div>
		</form>
	);
}
