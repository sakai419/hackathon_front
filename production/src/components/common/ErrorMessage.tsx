import isAPIError from "@/lib/utils/isAPIError";
import axios from "axios";
import { useEffect } from "react";

interface ErrorMessageProps {
	error: unknown;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="w-full flex-col items-center justify-center text-center">
			{axios.isAxiosError(error) ? (
				<>
					{isAPIError(error.response?.data) ? (
						<>
							<h2 className="text-red-500 font-semibold">
								API_ERROR
							</h2>
							<p className="text-sm text-gray-500">
								{`${error.response.data.code}: ${error.response.data.message}`}
							</p>
						</>
					) : (
						<>
							<h2 className="text-red-500 font-semibold">
								AXIOS_ERROR
							</h2>
							<p className="text-sm text-gray-500">
								{`${error.code}: ${error.message}`}
							</p>
						</>
					)}
				</>
			) : (
				<>
					<h2 className="text-red-500 font-semibold">
						UNKNWON_ERROR
					</h2>
					<p className="text-sm text-gray-500">
						Please read the console for more information
					</p>
				</>
			)}
		</div>
	);
}
