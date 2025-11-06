/**
 * Utility functions for Sidebar calculations and helpers
 */

import type { IndicatorStyle } from "./types/index";

/**
 * Linear interpolation between two numbers
 * @param start - Starting value
 * @param end - Ending value
 * @param t - Progress (0-1)
 * @returns Interpolated value
 */
export const lerp = (start: number, end: number, t: number): number =>
	start + (end - start) * t;

/**
 * Calculate transform values for indicator animation
 * @param tabRef - Reference to the active tab element's wrapper
 * @returns Transform values (scaleY and translateY), or null if element not found
 */
export const calculateTabTransform = (
	tabRef: React.RefObject<HTMLSpanElement | null>,
): IndicatorStyle | null => {
	const el = tabRef.current;
	if (!el) return null;

	const parentRect = el.parentElement?.getBoundingClientRect();
	const elRect = el.getBoundingClientRect();

	if (!parentRect) return null;

	// Calculate relative position from parent
	const relativeTop = elRect.top - parentRect.top;
	const centerY = relativeTop + elRect.height / 2;
	const parentCenterY = parentRect.height / 2;

	// Calculate scale for height (1.0 = full height)
	const scaleY = elRect.height / 24; // 24 is the base height of a tab item

	// Calculate translateY to move indicator to active tab
	const translateY = centerY - parentCenterY;

	return {
		scaleY: scaleY,
		translateY: translateY,
	};
};

/**
 * Determine if a route matches a tab's href
 * @param pathname - Current pathname from usePathname()
 * @param href - Tab's href to check against
 * @returns True if pathname matches or starts with href
 */
export const isTabActive = (pathname: string, href: string): boolean => {
	return pathname === href || pathname.startsWith(href);
};
