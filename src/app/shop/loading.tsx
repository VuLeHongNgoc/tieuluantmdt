'use client';


export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 w-48 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Skeleton */}
          <div className="lg:w-1/4 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="h-6 w-24 bg-gray-200 rounded mb-6"></div>
              
              {/* Search Skeleton */}
              <div className="mb-6">
                <div className="h-5 w-20 bg-gray-200 rounded mb-3"></div>
                <div className="flex">
                  <div className="h-10 bg-gray-200 rounded-l flex-grow"></div>
                  <div className="h-10 w-10 bg-gray-300 rounded-r"></div>
                </div>
              </div>
              
              {/* Categories Skeleton */}
              <div className="mb-6">
                <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="h-10 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>

              {/* Price Range Skeleton */}
              <div className="mb-6">
                <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="h-10 bg-gray-200 rounded w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="lg:w-3/4 w-full">
            {/* Sort Controls Skeleton */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="h-4 w-48 bg-gray-200 rounded"></div>
                <div className="flex items-center gap-4">
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                  <div className="h-10 w-40 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-64 bg-gray-200 animate-pulse"></div>
                  <div className="p-4">
                    <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-5 w-1/2 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 w-full bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-8">
              <div className="flex rounded-md">
                <div className="h-10 w-24 bg-gray-200 rounded-l"></div>
                <div className="h-10 w-10 bg-gray-300 mx-1"></div>
                <div className="h-10 w-10 bg-gray-200 mx-1"></div>
                <div className="h-10 w-10 bg-gray-200 mx-1"></div>
                <div className="h-10 w-24 bg-gray-200 rounded-r"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
