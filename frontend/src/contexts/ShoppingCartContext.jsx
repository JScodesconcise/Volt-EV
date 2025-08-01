import { createContext, useContext, useEffect, useState } from "react";

export const ShoppingCartContext = createContext(null);

export function ShoppingCartProvider({ children }) {
	const [visibility, setVisibility] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	return (
		<ShoppingCartContext
			value={{ visibility, setVisibility, cartItems, setCartItems }}
		>
			{children}
		</ShoppingCartContext>
	);
}
