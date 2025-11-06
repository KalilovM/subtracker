/**
 * Custom hook for managing animated tab indicator position
 */

import { useEffect, useState } from "react";
import type { IndicatorStyle } from "../types/index";
import { calculateTabTransform, lerp } from "../utils";
import { TAB_INDICATOR_ANIMATION_DURATION } from "../constants/index";

/**
 * Hook to manage animated tab indicator that follows the active tab
 * Uses transform-based animation for better performance
 * @param activeTabRef - Reference to the active tab's wrapper element
 * @returns Current indicator transform values
 */
export const useTabIndicator = (
	activeTabRef: React.RefObject<HTMLSpanElement | null>,
): IndicatorStyle => {
	const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>({
		scaleY: 0,
		translateY: 0,
	});
	const [prevStyle, setPrevStyle] = useState<IndicatorStyle>({
		scaleY: 0,
		translateY: 0,
	});

	useEffect(() => {
		// Get current tab transform values
		const currTransform = calculateTabTransform(activeTabRef);

		if (!currTransform) return; // nothing to do yet

		// If no previous, start indicator at current tab instantly
		if (prevStyle.scaleY === 0) {
			setIndicatorStyle(currTransform);
			setPrevStyle(currTransform);
			return;
		}

		// Animate indicator from previous to current
		let startTime: number | null = null;

		/**
		 * Animation frame callback for smooth indicator transition
		 */
		const animate = (time: number) => {
			if (!startTime) startTime = time;
			const elapsed = (time - startTime) / 1000;

			if (elapsed >= TAB_INDICATOR_ANIMATION_DURATION) {
				setIndicatorStyle(currTransform);
				setPrevStyle(currTransform);
				return;
			}

			const t = elapsed / TAB_INDICATOR_ANIMATION_DURATION;

			setIndicatorStyle({
				scaleY: lerp(prevStyle.scaleY, currTransform.scaleY, t),
				translateY: lerp(prevStyle.translateY, currTransform.translateY, t),
			});

			requestAnimationFrame(animate);
		};

		requestAnimationFrame(animate);
	}, [activeTabRef, prevStyle]);

	return indicatorStyle;
};
