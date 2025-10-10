export const metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-400 mb-8">The page you are looking for does not exist or has been moved.</p>
      <a href="/" className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md">Go back home</a>
    </div>
  )
}
