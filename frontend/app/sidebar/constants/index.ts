/**
 * Sidebar navigation and UI constants
 */

import type { DropdownLinkItem, TabItem } from "../types/index";

/**
 * Tab navigation items for the main dashboard navigation
 * Uses URL routing via Next.js Link component
 */
export const TAB_ITEMS: TabItem[] = [
	{ id: "tab-1", label: "Overview", href: "/dashboard/overview" },
	{ id: "tab-2", label: "Analytics", href: "/dashboard/analytics" },
	{ id: "tab-3", label: "Settings", href: "/dashboard/settings" },
];

/**
 * Dropdown menu items for user/organization options
 * Includes Profile, Billing, Team Management, and Sign Out
 */
export const DROPDOWN_ITEMS: DropdownLinkItem[] = [
	{ id: "profile", label: "Profile Settings", href: "/profile" },
	{ id: "billing", label: "Billing", href: "/billing" },
	{ id: "team", label: "Team Management", href: "/team" },
	{ id: "logout", label: "Sign Out", href: "/logout" },
];

/**
 * Animation configuration for tab indicator transitions
 */
export const TAB_INDICATOR_ANIMATION_DURATION = 0.3; // seconds

/**
 * Animation configuration for dropdown menu appearance
 */
export const DROPDOWN_ANIMATION_DELAY_STEP = 0.05; // seconds between items
