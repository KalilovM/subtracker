/**
 * Custom hook for managing animated tab indicator position
 * Animates indicator from previous tab position to current tab position
 */

import type { IndicatorStyle } from "../types/index";

/**
 * Hook to manage animated tab indicator that follows the active tab
 * Starts animation from previous tab position and animates to current tab position
 * @param activeTabRef - Reference to the currently active tab's wrapper element
 * @param prevTabRef - Reference to the previously active tab's wrapper element
 * @returns Current indicator transform values
 */
const getTranslate3d = (
	activeTabRef: React.RefObject<HTMLSpanElement | null>,
	prevTabRef: React.RefObject<HTMLSpanElement | null>,
): number => {
	if (
		activeTabRef.current &&
		prevTabRef.current &&
		activeTabRef !== prevTabRef
	) {
		const activeRect = activeTabRef.current.getBoundingClientRect();
		const prevRect = prevTabRef.current.getBoundingClientRect();
		const startTranslate3d = prevRect.top - activeRect.top;
		return startTranslate3d;
	}
	return 0;
};

export const useTabIndicator = (
	activeTabRef: React.RefObject<HTMLSpanElement | null>,
	prevTabRef: React.RefObject<HTMLSpanElement | null>,
): IndicatorStyle => {
	// Compute the value directly on every render - no state caching
	const translate3d = getTranslate3d(activeTabRef, prevTabRef);

	return {
		translate3d,
	};
};
