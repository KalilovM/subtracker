/**
 * Sidebar Component - Main navigation sidebar with tabs and dropdown menu
 *
 * A responsive sidebar featuring:
 * - Organization dropdown header with logo and menu
 * - Animated tab navigation with indicator
 * - Smooth transitions between routes
 */

"use client";

import { SidebarEvents, SidebarHeader, SidebarTabs } from "./components/index";
import { useDropdownOutsideClick } from "./hooks/index";
import type { SidebarProps } from "./types/index";

/**
 * Main Sidebar component - orchestrates header and tabs sections
 * @param previousPath - Previous route path for indicator animation
 * @param currentPath - Current route path for indicator position
 */
export default function Sidebar({ previousPath, currentPath }: SidebarProps) {
	// Manage dropdown state and outside-click detection
	const {
		isOpen: isDropdownOpen,
		toggle,
		close,
		dropdownRef,
	} = useDropdownOutsideClick();

	return (
		<aside className="fixed inset-y-0 left-0 w-64 bg-zinc-900 max-lg:hidden lg:bg-zinc-950">
			<nav className="flex flex-col h-full min-h-0">
				{/* Header with logo and dropdown menu */}
				<SidebarHeader
					isDropdownOpen={isDropdownOpen}
					onToggle={toggle}
					onClose={close}
					dropdownRef={dropdownRef}
				/>

				{/* Navigation tabs with animated indicator */}
				<div className="flex flex-1 flex-col overflow-y-auto p-4 [&>[data-slot=section]+[data-slot=section]]:mt-8">
					<SidebarTabs previousPath={previousPath} currentPath={currentPath} />
					<SidebarEvents />
				</div>

				{/* Footer spacer */}
				<div />
			</nav>
		</aside>
	);
}
