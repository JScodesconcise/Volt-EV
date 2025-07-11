import { createContext, useContext, useState } from "react";

export const ShoppingCartContext = createContext(null);

export function ShoppingCartProvider({ children }) {
	const [visibility, setVisibility] = useState(false);

	return (
		<ShoppingCartContext value={{ visibility, setVisibility }}>
			{children}
		</ShoppingCartContext>
	);
}

export function useShoppingCart() {
	return useContext(ShoppingCartContext);
}
