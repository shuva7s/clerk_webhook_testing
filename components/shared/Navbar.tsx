import { SignedIn, SignedOut, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "./ThemeSwitch";

export default function Navbar() {
    return (
        <header className="flex items-center justify-between py-5 px-5 md:px-8 xl:px-10">
            <div className="flex gap-10 items-center">
                <p className="text-2xl">Logo</p>
                <nav className="max-sm:hidden">
                    <ul className="flex gap-4">
                        <li className="p-2"><Link href="/">link</Link></li>
                        <li className="p-2"><Link href="/">link</Link></li>
                        <li className="p-2"><Link href="/">link</Link></li>
                    </ul>
                </nav>
            </div>


            <SignedOut>
                <div className="flex gap-4 items-center">
                    <Button asChild>
                        <Link href="/sign-in">Log in</Link>
                    </Button>
                    <ModeToggle />
                </div>
            </SignedOut>
            <SignedIn>
                <div className="flex gap-4 items-center">
                    <Button asChild variant="outline" className="max-sm:hidden">
                        <Link href="/create">Cerate Post</Link>
                    </Button>
                    <ModeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </SignedIn>

        </header >

    )
}