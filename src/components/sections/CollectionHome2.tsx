'use client';

import Image from 'next/image';

interface CollectionItem {
  id: number;
  image: string;
  alt: string;
  link: string;
}

const collections: CollectionItem[] = [
  {
    id: 1,
    image: '/images/collection/home-2/collection-1.jpg',
    alt: 'Women Collection',
    link: '/shop?category=women'
  },
  {
    id: 2,
    image: '/images/collection/home-2/collection-2.jpg',
    alt: 'Men Collection',
    link: '/shop?category=men'
  },
  {
    id: 3,
    image: '/images/collection/home-2/collection-3.jpg',
    alt: 'Accessories Collection',
    link: '/shop?category=accessories'
  }
];

export function CollectionHome2() {
  return (
    <div className="ps-section--collection-home-2 py-16 bg-gray-50">
      <div className="ps-container-fluid px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((collection) => (
            <div 
              key={collection.id}
              className="ps-collection--3 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Collection Image */}
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={collection.image}
                    alt={collection.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>

                {/* Shop Now Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => window.location.href = collection.link}
                    className="
                      ps-btn px-8 py-3 bg-white text-gray-800 font-semibold text-sm uppercase
                      border border-gray-300 rounded-full hover:bg-[#ca2028] hover:text-white 
                      hover:border-[#ca2028] transition-all duration-300 transform
                      translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                      shadow-lg hover:shadow-xl
                    "
                    style={{
                      fontFamily: 'Nunito Sans, sans-serif',
                      letterSpacing: '1px'
                    }}
                  >
                    Shop Now
                  </button>
                </div>

                {/* Category Label (Optional) */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-gray-800 uppercase tracking-wide">
                      {collection.alt.replace(' Collection', '')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
