/**
 * Custom hook for managing dropdown open/close state with outside-click detection
 */

import { useEffect, useRef, useState } from "react";

/**
 * Hook to manage dropdown visibility and handle outside clicks
 * @returns Object with isOpen state, toggle function, and ref for the dropdown element
 */
export const useDropdownOutsideClick = () => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	const toggle = () => setIsOpen((prev) => !prev);
	const close = () => setIsOpen(false);

	return { isOpen, toggle, close, dropdownRef };
};
