"use client";

import { CheckCircle, Gift, Crown } from "lucide-react";
import "./thanks-page.css";

export default function ThanksPage() {
  return (
    <div className="thanks-container">
      {/* Background Elements */}
      <div className="thanks-background-elements">
        <div className="thanks-bg-element thanks-bg-element-1"></div>
        <div className="thanks-bg-element thanks-bg-element-2"></div>
        <div className="thanks-bg-element thanks-bg-element-3"></div>
        <div className="thanks-bg-element thanks-bg-element-4"></div>
      </div>

      <div className="thanks-main-content">
        {/* Success Icon */}
        <div className="thanks-success-icon-container">
          <div className="thanks-success-icon">
            <div className="thanks-success-circle">
              <CheckCircle className="thanks-check-icon" />
            </div>
            <Crown className="thanks-crown-icon" />
          </div>
        </div>

        {/* Main Text */}
        <div className="thanks-text-content">
          <h1 className="thanks-main-title">Cảm ơn bạn!</h1>

          <div className="thanks-welcome-section">
            <Gift className="thanks-gift-icon" />
            <p className="thanks-welcome-text">
              Chào mừng bạn đến với{" "}
              <span className="thanks-premium-text">Audiva Premium</span>
            </p>
            <Gift className="thanks-gift-icon" />
          </div>

          <p className="thanks-description">
            Thanh toán của bạn đã được xử lý thành công! Bây giờ bạn có thể tận
            hưởng tất cả các tính năng premium của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
