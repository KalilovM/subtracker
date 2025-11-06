/**
 * DropdownMenu Component - Animated dropdown menu for user/org actions
 */

"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import type { DropdownLinkItem } from "../types/index";
import { DROPDOWN_ANIMATION_DELAY_STEP } from "../constants/index";

interface DropdownMenuProps {
	items: DropdownLinkItem[];
	isOpen: boolean;
	onClose: () => void;
}

/**
 * Dropdown menu component with animated item entrance
 * @param items - Array of dropdown menu items
 * @param isOpen - Whether the dropdown is currently visible
 * @param onClose - Callback to close the dropdown
 */
export function DropdownMenu({ items, isOpen, onClose }: DropdownMenuProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					role="menu"
					aria-label="Organization navigation menu"
					initial={{ opacity: 0, y: -12, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					exit={{ opacity: 0, y: -12, scale: 0.95 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
					className="absolute z-50 mt-2 rounded-lg shadow-lg top-full right-4 left-4 bg-zinc-800 ring-1 ring-white/10"
				>
					<ul className="py-2">
						{items.map((item, index) => (
							<motion.li
								key={item.id}
								initial={{ opacity: 0, x: -8 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{
									duration: 0.2,
									ease: "easeOut",
									delay: index * DROPDOWN_ANIMATION_DELAY_STEP,
								}}
							>
								<Link
									href={item.href}
									role="menuitem"
									onClick={onClose}
									className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors duration-150 hover:bg-zinc-700 hover:text-emerald-400 focus:bg-zinc-700 focus:text-emerald-400 focus:outline-none active:bg-zinc-600"
								>
									{item.icon && <item.icon className="size-5 shrink-0" />}
									<span>{item.label}</span>
								</Link>
							</motion.li>
						))}
					</ul>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
