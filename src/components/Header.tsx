import Link from "next/link"
import { auth } from "@/auth"
import SignIn from "./SignIn"

export default async function Header() {
    const session = await auth()

    return (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-orange-500">
                    Rezeptify
                </Link>
                <nav>
                    <ul className="flex items-center space-x-4">
                        <li>
                            <Link href="/" className="text-gray-600 hover:text-orange-500">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/recipes" className="text-gray-600 hover:text-orange-500">
                                Recipes
                            </Link>
                        </li>
                        <li>
                            <Link href="/submit" className="text-gray-600 hover:text-orange-500">
                                Submit Recipe
                            </Link>
                        </li>
                        <li>
                            {session ? (
                                <div>
                                    <Link href="/account" className="text-gray-600 hover:text-orange-500">
                                        <img src={session.user?.image || ""} width={32} className='rounded-full' alt="Profile" />
                                    </Link>
                                </div>

                            ) : (
                                <SignIn />
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

