import { ErrorMessage, LoadingScreen } from "@/components/common";
import { UserList } from "@/components/user";
import useUserResults from "@/hooks/useUserResults";

interface UserResultsProps {
	keyword: string;
}

export default function UserResults({ keyword }: UserResultsProps) {
	const { results, isLoading, hasMore, loadMore, error } = useUserResults({
		keyword,
	});

	if (error) {
		return <ErrorMessage error={error} />;
	}

	return keyword ? (
		<>
			{isLoading && <LoadingScreen />}
			<UserList users={results} hasMore={hasMore} loadMore={loadMore} />
		</>
	) : (
		<div className="text-center text-gray-500">
			キーワードを入力してください
		</div>
	);
}
