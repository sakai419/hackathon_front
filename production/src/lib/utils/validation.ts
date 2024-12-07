export function validateUserId(userId: string) {
	const validPattern = /^[a-zA-Z0-9._-]+$/;
	if (!validPattern.test(userId)) {
		return false;
	}
	return true;
}

export function validateMessage(message: string) {
	if (!message) {
		return false;
	}

	// 半角および全角空白を全て取り除いた結果が空ならfalseを返す
	const trimmedMessage = message.replace(/[\s　]/g, "");
	return trimmedMessage.length > 0;
}

export function validateLabel(label: string) {
	switch (label) {
		case "news":
		case "politics":
		case "economics":
		case "health":
		case "sports":
		case "entertainment":
		case "art":
		case "cooking":
		case "travel":
		case "fashion":
		case "beauty":
		case "pets":
		case "parenting":
		case "education":
		case "environment":
		case "climate":
		case "space":
		case "mental_health":
		case "fitness":
		case "reading":
		case "history":
		case "philosophy":
		case "religion":
		case "culture":
		case "volunteering":
		case "social_issues":
		case "law":
		case "taxes":
		case "investment":
		case "real_estate":
		case "diy":
		case "gardening":
		case "interior_design":
		case "automotive":
		case "gaming":
		case "anime_manga":
		case "creative_works":
		case "photography_video":
		case "media":
		case "marketing":
		case "branding":
		case "entrepreneurship":
		case "remote_work":
		case "data_science":
		case "iot":
		case "robotics_engineering":
		case "biotechnology":
		case "nanotechnology":
		case "energy_technology":
		case "archaeology":
		case "psychology":
		case "sociology":
		case "anthropology":
		case "geography":
		case "geology":
		case "meteorology":
		case "disaster_emergency_management":
		case "urban_planning":
		case "architecture":
		case "agriculture":
		case "nutrition_science":
		case "sleep_science":
		case "productivity":
		case "leadership":
		case "international_relations":
		case "future_predictions":
		case "events":
		case "community":
		case "trends":
		case "lifestyle":
		case "software_development":
		case "programming_languages":
		case "web_development":
		case "mobile_app_development":
		case "debugging_techniques":
		case "algorithms_mathematics":
		case "database_design":
		case "cloud_computing":
		case "server_management":
		case "network_security":
		case "cryptography":
		case "artificial_intelligence":
		case "machine_learning":
		case "deep_learning":
		case "computer_vision":
		case "natural_language_processing":
		case "blockchain_technology":
		case "quantum_computing":
		case "edge_computing":
		case "microservices_architecture":
		case "devops":
		case "container_technology":
		case "ci_cd":
		case "test_automation":
		case "ux_ui_design":
		case "agile_development_methodologies":
		case "open_source":
		case "version_control":
		case "api_design":
		case "performance_optimization":
			return true;
		default:
			return false;
	}
}
