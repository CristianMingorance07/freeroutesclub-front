export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-lg font-medium text-gray-700">Loading...</p>
        </div>
    )
}
