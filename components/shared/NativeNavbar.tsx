import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"


const NativeNavbar = () => {
    return (
        <div className="w-full flex justify-center fixed left-0 bottom-0 bg-background py-2 border-t sm:hidden">
            <Button asChild variant="outline" size="icon" className="p-2 rounded-full">
                <Link href="/create" >
                    <Image
                        src="/add.svg"
                        width={40}
                        height={40}
                        alt="add-post"
                        className="invert-image"
                    />
                </Link>
            </Button>
        </div>
    )
}

export default NativeNavbar