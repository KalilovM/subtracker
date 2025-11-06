/**
 * TabIndicator Component - Animated highlight bar for active tab
 * Uses transform-based animation for optimal performance
 */

"use client";

import { motion } from "motion/react";
import type { IndicatorStyle } from "../types/index";

interface TabIndicatorProps {
	style: IndicatorStyle;
}

/**
 * Animated indicator bar that highlights the active tab
 * Positioned absolutely within each tab wrapper, uses transform for smooth animation
 */
export function TabIndicator({ style }: TabIndicatorProps) {
	return (
		<motion.span
			className="absolute inset-y-2 -left-4 w-0.5 rounded-full bg-zinc-950 dark:bg-white"
			style={{
				transform: `scaleY(${style.scaleY}) translateY(${style.translateY}px)`,
				transformOrigin: "50% 50% 0px",
			}}
			transition={{
				type: "tween",
				duration: 0.3,
				ease: "easeInOut",
			}}
			aria-hidden="true"
		/>
	);
}
