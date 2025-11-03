"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type RefObject, useEffect, useRef, useState } from "react";
import CatalystImg from "@/public/catalyst.svg";

type SidebarProps = {
	open: boolean;
	onToggle: () => void;
	previousPath: string | null;
	currentPath: string;
};

type DropdownLinkItem = {
	id: string;
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
};

type TabItem = {
	id: string;
	label: string;
	href: string;
};

const DROPDOWN_ITEMS: DropdownLinkItem[] = [
	{ id: "profile", label: "Profile Settings", href: "/profile" },
	{ id: "billing", label: "Billing", href: "/billing" },
	{ id: "team", label: "Team Management", href: "/team" },
	{ id: "logout", label: "Sign Out", href: "/logout" },
];

/**
 * Tab items with href for Next.js Link navigation
 * No internal state needed—uses URL routing
 */
const TAB_ITEMS: TabItem[] = [
	{ id: "tab-1", label: "Overview", href: "/dashboard/overview" },
	{ id: "tab-2", label: "Analytics", href: "/dashboard/analytics" },
	{ id: "tab-3", label: "Settings", href: "/dashboard/settings" },
];

type TabRefs = Record<string, RefObject<HTMLAnchorElement>>;

export default function Sidebar({
	open,
	onToggle,
	previousPath,
	currentPath,
}: SidebarProps) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const pathname = usePathname();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const tabRefs: TabRefs = {};
	TAB_ITEMS.forEach((tab) => {
		tabRefs[tab.href] = useRef<HTMLAnchorElement>(null);
	});

	const [indicatorStyle, setIndicatorStyle] = useState<{
		top: number;
		height: number;
		left: number;
		width: number;
	}>({ top: 0, height: 0, left: 0, width: 0 });

	// Calculate position & size of given tab href's element
	const calcTabPosition = (href: string | null) => {
		if (!href) return null;
		const el = tabRefs[href]?.current;
		if (!el) return null;
		const containerRect = containerRef.current?.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();
		if (!containerRect) return null;

		return {
			top: elRect.top - containerRect.top,
			height: elRect.height,
			left: elRect.left - containerRect.left,
			width: elRect.width,
		};
	};

	useEffect(() => {
		// Get previous and current tab positions
		const prevPos = calcTabPosition(previousPath);
		const currPos = calcTabPosition(currentPath);

		if (!currPos) return; // nothing to do yet

		// If no previous, start indicator at current tab instantly
		if (!prevPos) {
			setIndicatorStyle(currPos);
			return;
		}

		// Animate indicator from previous to current
		const animationDuration = 0.3;

		let startTime: number | null = null;

		// Interpolate between previous and current positions smoothly
		const animate = (time: number) => {
			if (!startTime) startTime = time;
			const elapsed = (time - startTime) / 1000;

			if (elapsed >= animationDuration) {
				setIndicatorStyle(currPos);
				return;
			}

			// Linear interpolation helper
			const lerp = (start: number, end: number, t: number) =>
				start + (end - start) * t;

			const t = elapsed / animationDuration;

			setIndicatorStyle({
				top: lerp(prevPos.top, currPos.top, t),
				height: lerp(prevPos.height, currPos.height, t),
				left: lerp(prevPos.left, currPos.left, t),
				width: lerp(prevPos.width, currPos.width, t),
			});

			requestAnimationFrame(animate);
		};
		requestAnimationFrame(animate);
	}, [previousPath, currentPath]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		if (isDropdownOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDropdownOpen]);

	const handleDropdownToggle = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	/**
	 * Determine if a tab is active based on current pathname
	 * Matches exact href or partial pathname for flexibility
	 */
	const isTabActive = (href: string) => {
		return pathname === href || pathname.startsWith(href);
	};

	/**
	 * Get the currently active tab for layout animation
	 */
	const activeTab = TAB_ITEMS.find((tab) => isTabActive(tab.href));

	return (
		<aside className="fixed inset-y-0 left-0 w-64 bg-zinc-900 max-lg:hidden lg:bg-zinc-950">
			<nav className="flex flex-col h-full min-h-0">
				{/* Dropdown Header */}
				<div className="relative flex flex-col p-4 border-b border-zinc-950/5 dark:border-white/5">
					<div ref={dropdownRef}>
						<button
							type="button"
							onClick={handleDropdownToggle}
							aria-expanded={isDropdownOpen}
							aria-haspopup="true"
							aria-label="Toggle organization menu"
							className={`
								text-zinc-100 group flex w-full items-center gap-3 rounded-lg px-2 py-2.5 
								text-left text-base font-medium transition-all duration-200 sm:py-2 sm:text-sm
								${
									isDropdownOpen
										? "bg-zinc-800 text-emerald-400"
										: "bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-800"
								}
							`}
						>
							<span className="-m-0.5 inline-grid size-7 shrink-0 rounded-full align-middle outline -outline-offset-1 outline-white/10 *:col-start-1 *:row-start-1 *:rounded-full sm:size-6">
								<Image src={CatalystImg} alt="Logo" className="size-full" />
							</span>
							<span
								className={`transition-colors duration-200 ${isDropdownOpen ? "text-emerald-400" : ""}`}
							>
								Logo
							</span>
							<motion.span
								animate={{ rotate: isDropdownOpen ? 180 : 0 }}
								transition={{ duration: 0.2, ease: "easeOut" }}
								className={`
									ml-auto size-6 shrink-0 last:size-5 sm:size-5 sm:last:size-4
									${
										isDropdownOpen
											? "fill-emerald-400"
											: "fill-zinc-400 group-hover:fill-zinc-100 group-active:fill-zinc-100"
									}
								`}
							>
								<ChevronDownIcon />
							</motion.span>
						</button>

						{/* Dropdown Menu with Motion */}
						<AnimatePresence>
							{isDropdownOpen && (
								<motion.div
									role="menu"
									aria-label="Organization navigation menu"
									initial={{ opacity: 0, y: -12, scale: 0.95 }}
									animate={{ opacity: 1, y: 0, scale: 1 }}
									exit={{ opacity: 0, y: -12, scale: 0.95 }}
									transition={{ duration: 0.2, ease: "easeOut" }}
									className="absolute z-50 mt-2 rounded-lg shadow-lg left-4 right-4 top-full bg-zinc-800 ring-1 ring-white/10"
								>
									<ul className="py-2">
										{DROPDOWN_ITEMS.map((item, index) => (
											<motion.li
												key={item.id}
												initial={{ opacity: 0, x: -8 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													duration: 0.2,
													ease: "easeOut",
													delay: index * 0.05,
												}}
											>
												<Link
													href={item.href}
													role="menuitem"
													onClick={() => setIsDropdownOpen(false)}
													className="
														flex items-center gap-3 px-4 py-2.5 text-sm font-medium 
														text-zinc-300 transition-colors duration-150
														hover:bg-zinc-700 hover:text-emerald-400
														focus:bg-zinc-700 focus:text-emerald-400 focus:outline-none
														active:bg-zinc-600
													"
												>
													{item.icon && (
														<item.icon className="size-5 shrink-0" />
													)}
													<span>{item.label}</span>
												</Link>
											</motion.li>
										))}
									</ul>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>

				{/* Tabs Section */}
				<div
					ref={containerRef}
					className="flex flex-col flex-1 p-4 overflow-y-auto"
				>
					{/* Tab List */}
					<div className="flex flex-col gap-1 pb-4 border-b border-zinc-950/5 dark:border-white/5">
						{/* Indicator */}
						<motion.span
							layout
							style={{
								position: "absolute",
								left: indicatorStyle.left,
								top: indicatorStyle.top,
								width: indicatorStyle.width,
								height: indicatorStyle.height,
								backgroundColor: "rgba(16, 185, 129, 0.3)", // emerald-400 transparent
								borderRadius: "0.375rem",
								pointerEvents: "none",
								transition: "background-color 0.3s ease",
							}}
							aria-hidden="true"
						/>
						{TAB_ITEMS.map((tab) => {
							const isActive = tab.href === currentPath;

							return (
								<Link
									key={tab.id}
									href={tab.href}
									ref={tabRefs[tab.href]}
									className={`
										relative flex items-center gap-3 rounded-lg px-3 py-2.5 
										text-left text-sm font-medium transition-colors duration-200
										${isActive ? "text-emerald-400" : "text-zinc-400 hover:text-zinc-300"}
									`}
								>
									<span className="relative z-10">{tab.label}</span>
								</Link>
							);
						})}
					</div>
				</div>

				<div></div>
			</nav>
		</aside>
	);
}
