import getSidebarInfo from "@/services/api/sidebar/getSidebarInfo";
import { SidebarInfo } from "@/types/sidebar";
import { UserInfoWithoutBio } from "@/types/userInfoWithoutBio";
import { useState, useEffect } from "react";

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
						UserInfo: {
							UserId: data.user_info.user_id,
							UserName: data.user_info.user_name,
							ProfileImageUrl: data.user_info.profile_image_url,
							IsPrivate: data.user_info.is_private,
							IsAdmin: data.user_info.is_admin,
						} as UserInfoWithoutBio,
						UnreadConversationCount:
							data.unread_conversation_count || 0,
						UnreadNotificationCount:
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
