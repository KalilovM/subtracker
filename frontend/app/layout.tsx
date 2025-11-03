"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const previousPathRef = useRef<null | string>(null);
	const pathname = usePathname();

	// useEffect(() => {
	// 	previousPathRef.current = pathname;
	// }, [pathname]);

	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-950">
				<div className="relative flex flex-1">
					<Sidebar
						open={sidebarOpen}
						onToggle={() => setSidebarOpen((prev) => !prev)}
						previousPath={previousPathRef.current}
						currentPath={pathname}
					/>
					<main
						className={`flex-1 ml-0 md:ml-64 p-6 transition-all duration-300`}
					>
						{children}
					</main>
				</div>
			</body>
		</html>
	);
}
