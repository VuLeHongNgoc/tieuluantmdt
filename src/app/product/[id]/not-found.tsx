import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
      <p className="text-gray-600 mb-8">
        We couldn&apos;t find the product you&apos;re looking for. It might have been removed or doesn&apos;t exist.
      </p>
      <Link href="/shop" className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
        Back to Shop
      </Link>
    </div>
  );
}
