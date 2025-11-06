/**
 * SidebarTabs Component - Navigation tabs with animated indicator
 */

"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { TAB_ITEMS } from "../constants/index";
import { useTabIndicator } from "../hooks/index";
import { isTabActive as checkTabActive } from "../utils";
import { TabItem } from "./TabItem";

interface SidebarTabsProps {
	previousPath?: string | null;
	currentPath: string;
}

/**
 * Sidebar tabs section with navigation items and animated indicator
 * The indicator animates within the active tab's wrapper
 */
export function SidebarTabs({
	currentPath,
}: SidebarTabsProps) {
	const pathname = usePathname();

	// Create refs for each tab wrapper (spans with relative positioning)
	const tabWrapperRefs = useRef<Record<string, React.RefObject<HTMLSpanElement | null>>>({});
	TAB_ITEMS.forEach((tab) => {
		if (!tabWrapperRefs.current[tab.href]) {
			tabWrapperRefs.current[tab.href] = React.createRef<HTMLSpanElement | null>();
		}
	});

	// Find the active tab ref
	const activeTabRef = tabWrapperRefs.current[currentPath] || tabWrapperRefs.current[Object.keys(tabWrapperRefs.current)[0]];

	// Get animated indicator values
	const indicatorStyle = useTabIndicator(activeTabRef);

	return (
		<div data-slot="section" className="flex flex-col gap-0.5">
			{/* Tab Items */}
			{TAB_ITEMS.map((tab) => {
				const isActive = checkTabActive(pathname, tab.href);

				return (
					<TabItem
						key={tab.id}
						tab={tab}
						isActive={isActive}
						forwardRef={tabWrapperRefs.current[tab.href]}
						indicatorStyle={isActive ? indicatorStyle : undefined}
					/>
				);
			})}
		</div>
	);
}
