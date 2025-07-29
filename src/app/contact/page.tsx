import BreadcrumbMinimal from '@/components/ui/BreadcrumbMinimal';
import ContactForm from '@/components/ui/ContactForm';
import ContactMap from '@/components/ui/ContactMap';
import './contact.css';

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
          <div className="ps-contact">
            <div className="ps-contact__left">
              <ContactMap 
                address="268 Lý Thường Kiệt, P.14, Q.10, TP.HCM"
                title="CỬA HÀNG CHÍNH!"
                zoom={15}
              />
            </div>
            <div className="ps-contact__right" data-mh="contact-1">
              <div className="ps-contact__info">
                <h3 className="ps-heading">Liên hệ với chúng tôi</h3>
                <p>
                  Cảm ơn bạn đã quan tâm đến cửa hàng của chúng tôi. Hãy để lại thông tin để chúng tôi có thể hỗ trợ bạn tốt nhất.
                </p>
                <div className="ps-contact__detail">
                  <p><span>Địa chỉ</span>268 Lý Thường Kiệt, P.14, Q.10, TP.HCM</p>
                  <p><span>Điện thoại</span>028-3864-7256</p>
                  <p><span>Email</span><a href="mailto:contact@tieuluan.vn">contact@tieuluan.vn</a></p>
                  <p>
                    <span>Giờ làm việc</span> T2 - T6: 8h - 17h <br />
                    T7 - CN: Đóng cửa
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
