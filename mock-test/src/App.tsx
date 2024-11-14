import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { fireAuth } from "./firebase";
import RequestBody from "./request-body";

const Container = styled.div`
	margin: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: auto;
`;

const Button = styled.button`
	background-color: #3182ce;
	color: white;
	border: none;
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	margin-top: 1rem;
	cursor: pointer;
	&:disabled {
		background-color: #a0aec0;
		cursor: not-allowed;
	}
`;

const Input = styled.input`
	border: 1px solid #e2e8f0;
	border-radius: 0.5rem;
	padding: 0.5rem;
	width: 50%;
`;

const Select = styled.select`
	border: 1px solid #e2e8f0;
	border-radius: 0.5rem;
	padding: 0.5rem;
`;

const Card = styled.div`
	width: 50%;
	background-color: white;
	border: 1px solid #e2e8f0;
	border-radius: 0.5rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Form = styled.form`
	border: 1px solid #e2e8f0;
	padding: 1rem;
	border-radius: 0.5rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 1rem;
	width: 50%;
`;

const Response = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const URI = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

type User = {
	id: number;
	name: string;
	email: string;
	password: string;
};

const users: User[] = [
	{
		id: 1,
		name: "admin",
		email: "sakaitaiki.soccer@icloud.com",
		password: "Taiki3511",
	},
	{ id: 2, name: "test_a", email: "test@a.com", password: "pass1234" },
	{ id: 3, name: "test_b", email: "test@b.com", password: "pass1234" },
];

export default function Tester() {
	const [uri, setUri] = useState("");
	const [method, setMethod] = useState("GET");
	const [response, setResponse] = useState<any>(null);
	const [status, setStatus] = useState(0);
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User>(users[0]);
	const [parsedBody, setParsedBody] = useState(null);
	const [jwt, setJwt] = useState("");

	async function getJwt(userName: string) {
		setLoading(true);

		// ユーザー情報を取得
		const user = users.find((u) => u.name === userName);

		if (!user) {
			console.error("ユーザーが見つかりません。");
			return;
		}

		setUser(user);

		try {
			// Firebaseのサインイン処理
			const userCredential = await signInWithEmailAndPassword(
				fireAuth,
				user.email,
				user.password
			);

			// JWTを取得（Firebase Authはユーザー情報を持つ）
			const jwt = await userCredential.user.getIdToken();

			// JWTを格納する関数を呼び出す
			setJwt(jwt);
		} catch (error) {
			console.error("Error signing in:", error);
			// エラーハンドリングを追加することができます
		} finally {
			setLoading(false);
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			// ヘッダー設定
			const headers: HeadersInit = {
				"Content-Type": "application/json",
				Authorization: `Bearer ${jwt}`, // JWTトークンをヘッダーに追加
			};

			// リクエスト設定
			const options: RequestInit = {
				method,
				headers,
				credentials: "include",
				body: method !== "GET" ? JSON.stringify(parsedBody) : undefined, // GETメソッド以外でボディを追加
			};

			// HTTPリクエスト送信
			const res = await fetch(
				"http://localhost:8080/api/v1/" + uri,
				options
			);

			// ステータスコードを取得
			setStatus(res.status);

			if (res.status === 204) {
				setResponse({ message: "No content" });
				return;
			}

			const data = await res.json();
			if (Array.isArray(data) && data.length === 0) {
				setResponse({ message: "No results found" });
			} else {
				setResponse(data);
				console.log(data);
			}
		} catch (error) {
			console.error("リクエスト中にエラーが発生しました:", error);
			setResponse({ error: "リクエストに失敗しました。" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container>
			<Card>
				<h2>API Mock Tester</h2>
				<h3>User:</h3>
				<Select
					value={user.name}
					onChange={(e) => getJwt(e.target.value)}
				>
					{users.map((user) => (
						<option key={user.id} value={user.name}>
							{user.name}
						</option>
					))}
				</Select>
				<h3>Request:</h3>
				<Form onSubmit={handleSubmit}>
					<h1>URI</h1>
					<URI>
						<Select
							value={method}
							onChange={(e) => setMethod(e.target.value)}
						>
							<option value="GET">GET</option>
							<option value="POST">POST</option>
							<option value="PUT">PUT</option>
							<option value="PATCH">PATCH</option>
							<option value="DELETE">DELETE</option>
						</Select>
						<Input
							type="text"
							placeholder="Enter URI"
							value={uri}
							onChange={(e) => setUri(e.target.value)}
						/>
					</URI>
					<RequestBody
						parsedBody={parsedBody}
						setParsedBody={setParsedBody}
					/>
					<Button type="submit" disabled={loading}>
						{loading ? "Sending..." : "Send Request"}
					</Button>
				</Form>
				<Response>
					<h3>Status:</h3>
					<pre>
						<code>{status}</code>
					</pre>
					<h3>Response:</h3>
					<pre>
						<code>
							{(response &&
								JSON.stringify(
									response,
									(key, value) => {
										if (key === "profile_image_url") {
											return "*****";
										}
										if (key === "password") {
											return "*****";
										}
										if (key === "media") {
											return "Media data";
										}
										return value;
									},
									2
								)) ||
								"No response yet"}
						</code>
					</pre>
				</Response>
			</Card>
		</Container>
	);
}
