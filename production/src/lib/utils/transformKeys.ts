import camelCase from "lodash.camelcase";
import snakeCase from "lodash.snakecase";

export function transformKeysToCamelCase<T>(obj: T): T {
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

export function transformKeysToSnakeCase<T>(obj: T): T {
	if (Array.isArray(obj)) {
		return obj.map(transformKeysToSnakeCase) as T;
	} else if (obj !== null && typeof obj === "object") {
		return Object.entries(obj).reduce((acc, [key, value]) => {
			const snakeKey = snakeCase(key);
			acc[snakeKey as keyof T] = transformKeysToSnakeCase(value);
			return acc;
		}, {} as T);
	}
	return obj;
}
