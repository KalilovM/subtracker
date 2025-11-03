"use client";

import { useState, useRef } from "react";
import { gsap } from "gsap";
import { BellIcon, UserIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
	const [dropdown, setDropdown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleDropdown = (): void => {
		setDropdown((prev) => !prev);
		if (dropdownRef.current) {
			gsap.to(dropdownRef.current, {
				y: !dropdown ? 0 : -12,
				opacity: !dropdown ? 1 : 0,
				pointerEvents: !dropdown ? "auto" : "none",
				duration: 0.26,
				ease: "power2.out",
			});
		}
	};

	return (
		<header className="sticky top-0 z-20 w-full bg-white shadow-md dark:bg-gray-900">
			<nav className="flex items-center justify-between h-16 px-6 py-2">
				<span className="text-lg font-bold md:text-2xl">
					Subscription Tracker
				</span>
				<div className="flex items-center gap-4">
					<button aria-label="Notifications">
						<BellIcon className="w-5 h-5 text-gray-500" />
					</button>
					<div className="relative">
						<button
							onClick={handleDropdown}
							aria-haspopup="true"
							aria-expanded={dropdown}
							className="flex items-center"
						>
							<UserIcon className="w-6 h-6 mr-1 text-gray-500" />
							<span className="hidden md:block">Profile</span>
						</button>
						<div
							ref={dropdownRef}
							className={`absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow transition-all
                ${dropdown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
						>
							<ul>
								<li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
									Settings
								</li>
								<li className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
									Logout
								</li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
