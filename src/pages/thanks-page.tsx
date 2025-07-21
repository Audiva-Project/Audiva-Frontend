import { CheckCircle, Gift, Crown } from "lucide-react";
import "./thanks-page.css";
import api from "@/utils/api";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export default function ThanksPage() {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    type PremiumData = {
      status?: string;
      startDate?: string;
      endDate?: string;
      [key: string]: any;
    };

    const fetchPremium = async () => {
      try {
        if (!token) return;

        const res = await api.get("/user-premium/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const premiumData: PremiumData = res.data as PremiumData;

        const isPremium =
          premiumData?.status === "SUCCESS" &&
          !!premiumData?.endDate &&
          new Date(premiumData.endDate) > new Date();

        useAuthStore.setState((state) => ({
          premium: isPremium,
          premiumStartDate: premiumData?.startDate ?? null,
          premiumEndDate: premiumData?.endDate ?? null,
          user: state.user
            ? {
                ...state.user,
                premium: isPremium,
              }
            : null,
        }));

        console.log("Cập nhật premium sau khi thanh toán thành công");
      } catch (err) {
        console.error("Lỗi khi cập nhật premium sau thanh toán:", err);
      }
    };

    fetchPremium();
  }, [token]);

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
