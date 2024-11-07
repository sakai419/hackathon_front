import getSidebarInfo from "@/services/api/sidebar/getSidebarInfo";
import { SidebarInfo } from "@/types/sidebar";
import { useState, useEffect, SetStateAction } from "react";

export function useSidebarInfo() {
	const [sidebarInfo, setSidebarInfo] = useState<SidebarInfo | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchSidebarData = async () => {
			try {
				const data = await getSidebarInfo();

				if (data) {
					// JSON形式に変換し、SidebarInfo型に整形
					const sidebarData: SidebarInfo = {
						userInfo: {
							userId: data.UserInfo.UserId || "",
							userName: data.UserInfo.UserName || "",
							profileImageUrl:
								data.UserInfo.ProfileImageURL || "",
							isPrivate: data.UserInfo.IsPrivate || false,
							isAdmin: data.UserInfo.IsAdmin || false,
						},
						unreadConversationCount:
							data.UnreadConversationCount || 0,
						unreadNotificationCount:
							data.UnreadNotificationCount || 0,
					};

					setSidebarInfo(sidebarData);
				}
			} catch (err) {
				setError("Failed to fetch sidebar info");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchSidebarData(); // 初回のデータ取得
	}, []); // 初回マウント時に実行

	return { sidebarInfo, loading, error };
}
