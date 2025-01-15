export default function Header() {
    return (
        <header className="w-full flex justify-between items-center p-4 border-b border-gray-200">
            <div className="text-xl font-bold">Free Routes Club</div>
            <nav>
                <ul className="flex gap-4">
                    <li><a href="/trips" className="text-sm text-gray-700 hover:text-black">Trips</a></li>
                    <li><a href="/courses" className="text-sm text-gray-700 hover:text-black">Courses</a></li>
                    <li><a href="/merch" className="text-sm text-gray-700 hover:text-black">Merch</a></li>
                    <li><a href="/community" className="text-sm text-gray-700 hover:text-black">Community</a></li>
                    <li><a href="/social-media" className="text-sm text-gray-700 hover:text-black">Social Media</a></li>
                </ul>
            </nav>
        </header>
    )
}
