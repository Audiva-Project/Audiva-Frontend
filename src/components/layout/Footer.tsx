import { Link } from "react-router-dom"
import "./Footer.css"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Audiva</h3>
            <p className="footer-description">Giải pháp công nghệ hiện đại cho doanh nghiệp của bạn.</p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Liên kết</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Hỗ trợ</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Điều khoản
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Chính sách
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Liên hệ</h4>
            <div className="contact-info">
              <p>Email: info@audiva.com</p>
              <p>Phone: +84 123 456 789</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Audiva. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
