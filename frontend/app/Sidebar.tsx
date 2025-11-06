/**
 * Legacy Sidebar.tsx - Now delegates to refactored modular sidebar
 * This file is maintained for backward compatibility.
 * All sidebar logic has been moved to the sidebar/ folder for better maintainability.
 */

export { default } from "./sidebar/index";
export type { SidebarProps } from "./sidebar/types/index";
