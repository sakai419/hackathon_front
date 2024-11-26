"use client";

import useClientProfile from "@/hooks/useClientProfile";
import { Profile } from "@/types/profile";
import React, { createContext, useContext, ReactNode } from "react";

interface ClientProfileContextType {
	clientProfile: Profile | null;
	isLoading: boolean;
	error: string | null;
}

const ClientProfileContext = createContext<ClientProfileContextType | null>(
	null
);

export const ClientProfileProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { profile: clientProfile, isLoading, error } = useClientProfile();

	return (
		<ClientProfileContext.Provider
			value={{
				clientProfile,
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
