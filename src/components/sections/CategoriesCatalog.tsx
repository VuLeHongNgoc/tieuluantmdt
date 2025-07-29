'use client';

import Image from 'next/image';

interface CategoryProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
}

interface CategoryBlock {
  id: string;
  title: string;
  link: string;
  products: CategoryProduct[];
}

interface CategoriesCatalogProps {
  categories?: CategoryBlock[];
}

export default function CategoriesCatalog({ categories = [] }: CategoriesCatalogProps) {
  // Default categories từ template
  const defaultCategories: CategoryBlock[] = [
    {
      id: 'on-sale',
      title: 'On sale',
      link: '#',
      products: [
        {
          id: '1',
          name: 'Cotton blue-gray t-shirt',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-1.jpg'
        },
        {
          id: '2',
          name: 'Leather brown handbag',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-2.jpg'
        },
        {
          id: '3',
          name: 'Leather brown handbag',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-3.jpg'
        }
      ]
    },
    {
      id: 'men',
      title: 'Men',
      link: '#',
      products: [
        {
          id: '4',
          name: 'Cotton blue-gray t-shirt',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-4.jpg'
        },
        {
          id: '5',
          name: 'Leather brown handbag',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-5.jpg'
        },
        {
          id: '6',
          name: 'Leather brown handbag',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-6.jpg'
        }
      ]
    },
    {
      id: 'women',
      title: 'Women',
      link: '#',
      products: [
        {
          id: '7',
          name: 'Cotton blue-gray t-shirt',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-7.jpg'
        },
        {
          id: '8',
          name: 'Leather brown handbag',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-8.jpg'
        },
        {
          id: '9',
          name: 'Leather brown handbag',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-9.jpg'
        }
      ]
    },
    {
      id: 'accessories',
      title: 'Accessories',
      link: '#',
      products: [
        {
          id: '10',
          name: 'Cotton blue-gray t-shirt',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-10.jpg'
        },
        {
          id: '11',
          name: 'Leather brown handbag',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-11.jpg'
        },
        {
          id: '12',
          name: 'Leather brown handbag',
          price: 1250.00,
          originalPrice: 725.00,
          image: '/images/product/home-6/home-6-12.jpg'
        }
      ]
    }
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="ps-section--catalog">
      <div className="ps-container-fluid">
        <div className="row">
          {displayCategories.map((category) => (
            <div key={category.id} className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <div className="ps-block--catalog">
                <div className="ps-block__header">
                  <h4>{category.title}</h4>
                  <a href={category.link}>
                    Shop all<i className="exist-rightarrow"></i>
                  </a>
                </div>
                <div className="ps-block__content">
                  {category.products.map((product) => (
                    <div key={product.id} className="ps-product--catalog">
                      <div className="ps-product__thumbnail">
                        <a className="ps-product__overlay" href="#"></a>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={120}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <div className="ps-product__content">
                        <a className="ps-product__title" href="#">
                          {product.name}
                        </a>
                        <p>
                          ${product.price.toFixed(2)}
                          {product.originalPrice && (
                            <del> ${product.originalPrice.toFixed(2)} </del>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
