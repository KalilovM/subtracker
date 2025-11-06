/**
 * SidebarHeader Component - Organization logo and dropdown toggle
 */

"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import Image from "next/image";
import CatalystImg from "@/public/catalyst.svg";
import { DropdownMenu } from "./DropdownMenu";
import { DROPDOWN_ITEMS } from "../constants/index";

interface SidebarHeaderProps {
	isDropdownOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
	dropdownRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Sidebar header with organization logo and dropdown menu
 */
export function SidebarHeader({
	isDropdownOpen,
	onToggle,
	onClose,
	dropdownRef,
}: SidebarHeaderProps) {
	return (
		<div className="relative flex flex-col p-4 border-b border-zinc-950/5 dark:border-white/5">
			<div ref={dropdownRef}>
				{/* Toggle Button */}
				<button
					type="button"
					onClick={onToggle}
					aria-expanded={isDropdownOpen}
					aria-haspopup="true"
					aria-label="Toggle organization menu"
					className={`group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base font-medium text-zinc-100 transition-all duration-200 sm:py-2 sm:text-sm ${
						isDropdownOpen
							? "bg-zinc-800 text-emerald-400"
							: "bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-800"
					}`}
				>
					<span className="-m-0.5 inline-grid size-7 shrink-0 rounded-full align-middle outline -outline-offset-1 outline-white/10 *:col-start-1 *:row-start-1 *:rounded-full sm:size-6">
						<Image src={CatalystImg} alt="Logo" className="size-full" />
					</span>
					<span
						className={`transition-colors duration-200 ${
							isDropdownOpen ? "text-emerald-400" : ""
						}`}
					>
						Logo
					</span>
					<motion.span
						animate={{ rotate: isDropdownOpen ? 180 : 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className={`ml-auto size-6 shrink-0 last:size-5 sm:size-5 sm:last:size-4 ${
							isDropdownOpen
								? "fill-emerald-400"
								: "fill-zinc-400 group-hover:fill-zinc-100 group-active:fill-zinc-100"
						}`}
					>
						<ChevronDownIcon />
					</motion.span>
				</button>

				{/* Dropdown Menu */}
				<DropdownMenu
					items={DROPDOWN_ITEMS}
					isOpen={isDropdownOpen}
					onClose={onClose}
				/>
			</div>
		</div>
	);
}
