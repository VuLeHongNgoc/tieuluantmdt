'use client';

import { useState } from 'react';

interface NewsletterCollectionProps {
  newsletterTitle?: string;
  newsletterDescription?: string;
  collectionTitle?: string;
  collectionButtonText?: string;
  collectionLink?: string;
  newsletterBackgroundImage?: string;
  collectionBackgroundImage?: string;
}

export default function NewsletterCollection({
  newsletterTitle = "Sign up for newsletters",
  newsletterDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed fermentum nibh, vel aliquet massa.",
  collectionTitle = "Formal White Shirt",
  collectionButtonText = "Shop now",
  collectionLink = "#",
  newsletterBackgroundImage = "/images/background/subscribe-6.jpg",
  collectionBackgroundImage = "/images/collection/home-6/collection.jpg"
}: NewsletterCollectionProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would typically send the email to your newsletter service
      console.log('Newsletter signup:', email);
      
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="ps-section--home-6-subscribe">
      <div className="ps-container-fluid">
        <div className="row">
          {/* Newsletter Section */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <form
              className="bg--cover ps-form--subscribe-4"
              onSubmit={handleNewsletterSubmit}
              style={{
                backgroundImage: `url(${newsletterBackgroundImage})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
              data-mh="home-6-subscribe"
            >
              <h3 className="ps-heading">{newsletterTitle}</h3>
              <p>{newsletterDescription}</p>
              
              <div className="form-group">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button 
                  className="ps-btn" 
                  type="submit"
                  disabled={isSubmitting || !email}
                >
                  {isSubmitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                </button>
              </div>
              
              {message && (
                <div className={`alert ${message.includes('Thank you') ? 'alert-success' : 'alert-danger'} mt-3`}>
                  {message}
                </div>
              )}
            </form>
          </div>

          {/* Collection Section */}
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <div
              className="ps-collection--6 bg--cover"
              data-mh="home-6-subscribe"
              style={{
                backgroundImage: `url(${collectionBackgroundImage})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <div className="ps-collection__content">
                <h4 
                  dangerouslySetInnerHTML={{ 
                    __html: collectionTitle.replace(/\s/, '<br />') 
                  }}
                />
                <a 
                  className="ps-btn--underline" 
                  href={collectionLink}
                  onClick={(e) => {
                    if (collectionLink === '#') {
                      e.preventDefault();
                      console.log('Collection link clicked');
                    }
                  }}
                >
                  {collectionButtonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
