export default function Page() {
  return (
      <section className="h-[80vh] flex flex-col items-center justify-center text-center p-8 bg-black text-white">
        <h1 className="text-4xl font-bold mb-4">Feel the Freedom on Two Wheels</h1>
        <p className="text-lg max-w-md mx-auto">
          Escape the routine, embrace the open road, and discover the world on your motorcycle.
        </p>
        <div className="mt-8 flex gap-4">
          <a href="/trips" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">View Trips</a>
          <a href="/courses" className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200">Our Courses</a>
        </div>
      </section>
  )
}
