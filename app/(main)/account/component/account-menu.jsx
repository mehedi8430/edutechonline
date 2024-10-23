"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
	{ label: "Profile", href: "/account" },
	{ label: "Enrolled Courses", href: "/account/enrolled-courses" },
];

function Menu() {
	const pathname = usePathname();

	return (
		<ul className="list-none sidebar-nav mb-0 mt-3" id="navmenu-nav">
			{
				menu.map((item, i) => (
					<li className="" key={i}>
						<Link
							href={item.href}
							className={`flex items-center py-2 rounded ${pathname === item.href ? "text-primary" : "text-slate-400"
								}`}>
							<h6 className="mb-0 font-semibold">{item?.label}</h6>
						</Link>
					</li>
				))
			}
			<li className="">
				<Button
					onClick={() => signOut()}
					className="text-slate-400 flex items-center py-2 rounded"
				>
					Sign Out
				</Button>
			</li>
		</ul>
	);
}

export default Menu;
