import { parse } from "path";
import React, { useState } from "react";
import styled from "styled-components";

type Props = {
	parsedBody: any;
	setParsedBody: React.Dispatch<React.SetStateAction<any>>;
};

const Container = styled.div`
	border: 1px solid #e2e8f0;
	border-radius: 0.5rem;
	margin: 20px;
	width: 70%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Input = styled.textarea`
	font-size: 16px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 70%;
`;

const Button = styled.button`
	background-color: #3182ce;
	color: white;
	border: none;
	border-radius: 0.5rem;
	padding: 0.5rem 1rem;
	margin: 1rem;
	cursor: pointer;
	&:disabled {
		background-color: #a0aec0;
		cursor: not-allowed;
	}
`;

function RequestBody(props: Props) {
	const [requestBody, setRequestBody] = useState("");
	const [mes, setMes] = useState("");
	const [state, setState] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setRequestBody(event.target.value);
	};

	const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
		event.preventDefault();
		try {
			const parsed = JSON.parse(requestBody);
			props.setParsedBody(parsed);
			setState("success");
			setMes("ボディをセットしました。");
		} catch (e) {
			props.setParsedBody(null);
			setState("error");
			setMes("無効なJSON形式です。");
		}
	};

	return (
		<Container>
			<h1>body</h1>
			<Input
				value={requestBody}
				onChange={handleChange}
				rows={10}
				cols={20}
				placeholder='{"key": "value"}'
			/>
			<Button onClick={handleSubmit}>Set Body</Button>
			{state === "success" && <p style={{ color: "green" }}>{mes}</p>}
			{state === "error" && <p style={{ color: "red" }}>{mes}</p>}
		</Container>
	);
}

export default RequestBody;
