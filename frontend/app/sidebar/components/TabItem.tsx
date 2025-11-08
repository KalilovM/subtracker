/**
 * TabItem Component - Individual navigation tab with active state
 */

"use client";

import { HomeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import type { TabItem as TabItemType } from "../types/index";
import { TabIndicator } from "./TabIndicator";
import type { IndicatorStyle } from "../types/index";

interface TabItemProps {
	tab: TabItemType;
	isActive: boolean;
	forwardRef: React.RefObject<HTMLSpanElement | null>;
	indicatorStyle?: IndicatorStyle;
}

/**
 * Individual tab item component with optional animated indicator
 * Displays icon, label, and highlights when active
 * Indicator is only shown when this tab is active
 */
export const TabItem = ({
	tab,
	isActive,
	forwardRef,
	indicatorStyle,
}: TabItemProps) => {
	return (
		<span ref={forwardRef} className="relative">
			{isActive && indicatorStyle && <TabIndicator style={indicatorStyle} />}
			<Link
				href={tab.href}
				className="flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5 hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5"
			>
				<HomeIcon
					className={`size-6 shrink-0 sm:size-5 ${
						isActive
							? "fill-zinc-950 dark:fill-white"
							: "fill-zinc-500 dark:fill-zinc-400"
					}`}
				/>
				<span className="truncate">{tab.label}</span>
			</Link>
		</span>
	);
};
