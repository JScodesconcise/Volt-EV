import { useCallback, useRef } from "react";

export function useDebouncedCallback(callback, delay = 300) {
	const timerRef = useRef();

	return useCallback(
		(...args) => {
			clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => callback(...args), delay);
		},
		[callback, delay]
	);
}
