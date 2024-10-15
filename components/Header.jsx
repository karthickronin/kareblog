import Link from "next/link"

export default function Header() {
    return  <header className="bg-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/"><h1 className="text-3xl p-1 border border-blue-500 uppercase">KARE Today</h1></Link>
                    <nav className="space-x-2">
                        <Link href="/" className="hover:text-white p-2 rounded hover:bg-blue-500 text-blue-500 font-semibold">Home</Link>
                        <Link href="/about" className="hover:text-white p-2 rounded hover:bg-blue-500 text-blue-500 font-semibold">About</Link>
                        <Link href="/contact" className="hover:text-white p-2 rounded hover:bg-blue-500 text-blue-500 font-semibold">Contact</Link>
                    </nav>
                </div>
            </header>
}