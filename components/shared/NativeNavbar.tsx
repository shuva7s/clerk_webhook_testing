import Link from "next/link"
import { Button } from "../ui/button"
import Image from "next/image"


const NativeNavbar = () => {
    return (
        <div className="w-full flex justify-center fixed bottom-0 bg-white py-2 border-t sm:hidden">
            <Button asChild variant="outline" size="icon" className="p-2 rounded-full">
                <Link href="/create" >
                    <Image
                        src="/add.svg"
                        width={40}
                        height={40}
                        alt="add-post"
                    />
                </Link>
            </Button>
        </div>
    )
}

export default NativeNavbar