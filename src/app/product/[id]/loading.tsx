'use client';


export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center space-x-2 mb-8">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Product detail skeleton */}
      <div className="flex flex-col md:flex-row -mx-4">
        {/* Product images skeleton */}
        <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
          <div className="bg-gray-200 aspect-square w-full mb-4 rounded"></div>
          <div className="flex space-x-2">
            <div className="bg-gray-200 aspect-square w-1/4 rounded"></div>
            <div className="bg-gray-200 aspect-square w-1/4 rounded"></div>
            <div className="bg-gray-200 aspect-square w-1/4 rounded"></div>
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="w-full md:w-1/2 px-4">
          <div className="h-8 w-2/3 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-6"></div>
          
          <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-6"></div>
          
          <div className="h-5 w-1/4 bg-gray-200 rounded mb-3"></div>
          <div className="flex space-x-2 mb-6">
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
          </div>
          
          <div className="h-5 w-1/4 bg-gray-200 rounded mb-3"></div>
          <div className="flex space-x-2 mb-6">
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
            <div className="h-8 w-8 bg-gray-200 rounded"></div>
          </div>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="h-12 w-32 bg-gray-200 rounded"></div>
            <div className="h-12 w-48 bg-gray-200 rounded"></div>
          </div>
          
          <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Tabs skeleton */}
      <div className="mt-16">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
            <div className="h-10 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
      </div>

      {/* Related products skeleton */}
      <div className="mt-16">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8 mx-auto"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded mb-2"></div>
              <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
