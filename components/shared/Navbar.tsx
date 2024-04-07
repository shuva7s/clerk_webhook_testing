import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
export default function Navbar() {
    return (
        <header className="flex items-center justify-between py-5">
            <p className="text-2xl">Logo</p>
            <nav>
                <ul className="flex gap-4">
                    <li className="p-2"><Link href="/">link</Link></li>
                    <li className="p-2"><Link href="/">link</Link></li>
                    <li className="p-2"><Link href="/">link</Link></li>
                </ul>
            </nav>
            <SignedOut>
                <Button asChild>
                    <Link href="/sign-in">Log in</Link>
                </Button>
            </SignedOut>
            <SignedIn>
                <div className="flex gap-4 items-center">
                    <Button asChild variant="outline">
                        <Link href="/create">Cerate Post</Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                </div>

            </SignedIn>
        </header >

    )
}