import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center p-5 fixed top-0 left-0 right-0">
            <div className="flex gap-2 font-mono">
                <img src="code.png" alt="logo" height={25} width={35} />
                <h1 className="text-2xl text-[#9a59e0]">Code to Image</h1>
            </div>
            <div className="">
                <Link href={"https://github.com/PrinceJais"}>
                    <img src="github.png" alt="github" height={40} width={40} className="rounded-full" />
                </Link>
            </div>
        </div>
    )
}