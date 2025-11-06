/**
 * Type definitions for Sidebar components and navigation items
 */

import type React from "react";

/**
 * Represents a navigation tab item with routing information
 */
export interface TabItem {
	id: string;
	label: string;
	href: string;
}

/**
 * Represents a dropdown menu item with optional icon support
 */
export interface DropdownLinkItem {
	id: string;
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Tab reference mapping for DOM access and measurements
 */
export type TabRefs = Record<string, React.RefObject<HTMLAnchorElement | null>>;

/**
 * Indicator style properties using transform for smooth animation
 * Uses scaleY for height and translateY for vertical position
 */
export interface IndicatorStyle {
	scaleY: number;
	translateY: number;
}

/**
 * Props for the main Sidebar component
 */
export interface SidebarProps {
	open: boolean;
	onToggle: () => void;
	previousPath: string | null;
	currentPath: string;
}
