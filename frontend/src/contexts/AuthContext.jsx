import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [user, setUser] = useState({});

	useEffect(() => {
		for (const key in user) {
			console.log(key + ": " + user[key]);
		}
	}, [user]);

	return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
}
