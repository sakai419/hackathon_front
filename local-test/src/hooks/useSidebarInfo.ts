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
				setLoading(true);
				const data = await getSidebarInfo();
				if (data) {
					// JSON形式に変換し、SidebarInfo型に整形
					const sidebarData: SidebarInfo = {
						userInfo: {
							userId: data.user_info.user_id,
							userName: data.user_info.user_name,
							profileImageUrl: data.user_info.profile_image_url,
							isPrivate: data.user_info.is_private,
							isAdmin: data.user_info.is_admin,
						},
						unreadConversationCount:
							data.unread_conversation_count || 0,
						unreadNotificationCount:
							data.unread_notification_count || 0,
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
