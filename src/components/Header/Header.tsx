import { latoSans, openSans } from "@/utils/fonts";
import Link from "next/link";

const Header = ({ appName }: { appName: string }) => {
	return (
		<div className="flex justify-between items-center bg-slate-400 p-5 min-h-14">
			<h1 className={`${latoSans.className} font-bold text-[36px]`}>
				{appName}
			</h1>
			<nav className={`flex gap-4 ${openSans.className}`}>
				<Link className="hover:underline" href="/">
					Home
				</Link>
				<Link className="hover:underline" href="/about">
					About
				</Link>
				<Link className="hover:underline" href="/phone">
					Phone
				</Link>
				<Link className="hover:underline" href="/crypto">
					Crypto
				</Link>
				<Link className="hover:underline" href="/stuff">
					Stuff
				</Link>
			</nav>
		</div>
	);
};

export default Header;
