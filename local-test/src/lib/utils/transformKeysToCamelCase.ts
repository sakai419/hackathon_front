import camelCase from "lodash.camelcase";

export default function transformKeysToCamelCase<T>(obj: T): T {
	if (Array.isArray(obj)) {
		return obj.map(transformKeysToCamelCase) as T;
	} else if (obj !== null && typeof obj === "object") {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			const camelKey = camelCase(key);
			acc[camelKey as keyof T] = transformKeysToCamelCase(value);
			return acc;
		}, {} as T);
	}
	return obj;
}
