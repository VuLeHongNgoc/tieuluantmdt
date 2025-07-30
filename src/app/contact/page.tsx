import BreadcrumbMinimal from '@/components/ui/BreadcrumbMinimal';
import ContactForm from '@/components/ui/ContactForm';
import ContactMap from '@/components/ui/ContactMap';

// Trang Liên Hệ (Contact) dựa trên Contact.html template
export default function ContactPage() {
  return (
    <div className="contact-page">
      {/* Breadcrumb tối giản */}
      <div className="ps-container">
        <BreadcrumbMinimal
          items={[
            { label: 'Trang chủ', href: '/' },
            { label: 'Liên hệ', href: '#', active: true }
          ]}
        />
      </div>
      
      <div className="ps-content pt-80 pb-80">
        <div className="ps-container">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cột bên trái - Bản đồ */}
            <div className="w-full md:w-1/2">
              <div className="h-[560px] w-full md:h-full">
                <ContactMap 
                  address="268 Lý Thường Kiệt, P.14, Q.10, TP.HCM"
                  title="CỬA HÀNG CHÍNH!"
                  zoom={15}
                />
              </div>
            </div>
            
            {/* Cột bên phải - Thông tin liên hệ và form */}
            <div className="w-full md:w-1/2 bg-white p-6 lg:p-10 rounded-md shadow-sm">
              <div className="max-w-lg mx-auto">
                <h3 className="text-2xl font-bold mb-6">Liên hệ với chúng tôi</h3>
                <p className="text-gray-600 mb-6">
                  Cảm ơn bạn đã quan tâm đến cửa hàng của chúng tôi. Hãy để lại thông tin để chúng tôi có thể hỗ trợ bạn tốt nhất.
                </p>
                
                {/* Thông tin liên hệ */}
                <div className="mb-8 space-y-3">
                  <div className="flex items-start">
                    <i className="fa fa-map-marker text-blue-600 mt-1 w-6"></i>
                    <span className="ml-3">268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fa fa-phone text-blue-600 mt-1 w-6"></i>
                    <span className="ml-3">028-3864-7256</span>
                  </div>
                  <div className="flex items-start">
                    <i className="fa fa-envelope text-blue-600 mt-1 w-6"></i>
                    <a href="mailto:contact@tieuluan.vn" className="ml-3 text-blue-600 hover:underline">contact@tieuluan.vn</a>
                  </div>
                  <div className="flex items-start">
                    <i className="fa fa-clock-o text-blue-600 mt-1 w-6"></i>
                    <div className="ml-3">
                      <div>T2 - T6: 8h - 17h</div>
                      <div>T7 - CN: Đóng cửa</div>
                    </div>
                  </div>
                </div>
                
                {/* Form liên hệ */}
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
