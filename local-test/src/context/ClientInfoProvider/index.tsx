import useClientProfile from "@/hooks/useClientProfile";
import { Profile } from "@/types/profile";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from "react";

interface ClientProfileContextType {
	clientProfile: Profile | null;
	setClientProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
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
	const [clientProfile, setClientProfile] = useState<Profile | null>(null);
	const { profile, isLoading, error } = useClientProfile();

	useEffect(() => {
		if (profile) {
			setClientProfile(profile);
		}
	}, [profile]);

	return (
		<ClientProfileContext.Provider
			value={{
				clientProfile,
				setClientProfile,
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
