export default function SignUpLink() {
	return (
		<div className="text-sm text-center text-gray-500">
			アカウントをお持ちでない場合は
			<a href="/signup" className="text-blue-600 hover:underline">
				新規登録
			</a>
			してください
		</div>
	);
}
