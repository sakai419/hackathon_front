"use client";

import useClientProfile from "@/hooks/useClientProfile";
import { Profile } from "@/types/profile";
import React, { createContext, useContext, ReactNode } from "react";

interface ClientProfileContextType {
	profile: Profile | null;
	isLoading: boolean;
	error: unknown;
}

const ClientProfileContext = createContext<ClientProfileContextType | null>(
	null
);

export const ClientProfileProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { profile, isLoading, error } = useClientProfile();

	return (
		<ClientProfileContext.Provider
			value={{
				profile,
				isLoading,
				error,
			}}
		>
			{children}
		</ClientProfileContext.Provider>
	);
};

export const useClientProfileContext = (): ClientProfileContextType => {
	const context = useContext(ClientProfileContext);
	if (!context) {
		throw new Error(
			"useClientProfileContext must be used within a ClientProfileProvider"
		);
	}
	return context;
};
