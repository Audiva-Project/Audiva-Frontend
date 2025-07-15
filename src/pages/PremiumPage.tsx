import { Check, Download, Headphones, Zap } from "lucide-react";
import "./PremiumPage.css";
import { useEffect, useState } from "react";
import api from "@/utils/api";

export default function Component() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [currentPremium, setCurrentPremium] = useState<null | {
    startDate: string;
    endDate: string;
    premiumName: string;
  }>(null);
  const token = localStorage.getItem("auth_token") || "";

  const features = [
    {
      icon: <Headphones className="w-5 h-5" />,
      title: "Chất lượng cao",
      description: "Âm thanh lossless và Hi-Fi",
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: "Tải về offline",
      description: "Nghe nhạc mọi lúc mọi nơi",
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Bỏ qua không giới hạn",
      description: "Chuyển bài thoải mái",
    },
  ];

  const plans = [
    {
      name: "Audiva",
      badge: "PLUS",
      price: "13.000đ",
      period: "/tháng",
      description: "Nghe nhạc với chất lượng cao nhất, không quảng cáo",
      features: [
        "Nghe nhạc không quảng cáo",
        "Nghe và tải nhạc Lossless",
        "Lưu trữ nhạc không giới hạn",
        "Tính năng nghe nhạc nâng cao",
        "Mở rộng khả năng Upload",
      ],
      buttonText: "ĐĂNG KÝ GÓI",
      cardClass: "plus",
      buttonClass: "plus-btn",
    },
    {
      name: "Audiva",
      badge: "PREMIUM",
      price: "41.000đ",
      period: "/tháng",
      description: "Toàn bộ đặc quyền Plus cùng kho nhạc Premium",
      features: [
        "Kho nhạc Premium",
        "Nghe nhạc không quảng cáo",
        "Nghe và tải nhạc Lossless",
        "Lưu trữ nhạc không giới hạn",
        "Tính năng nghe nhạc nâng cao",
        "Mở rộng khả năng Upload",
      ],
      buttonText: "ĐĂNG KÝ GÓI",
      cardClass: "premium",
      buttonClass: "premium-btn",
    },
  ];

  useEffect(() => {
    const storedUser = localStorage.getItem("auth-storage");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserId(parsedUser.state.user?.id);
      } catch (err) {
        console.error("Lỗi parse user từ localStorage");
      }
    }
  }, []);

  useEffect(() => {
    const fetchPremiumStatus = async () => {
      try {
        const res = await api.get("/identity/user-premium/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.status === "SUCCESS") {
          setCurrentPremium({
            startDate: res.data.startDate,
            endDate: res.data.endDate,
            premiumName: res.data.premiumName,
          });
        }
      } catch (error) {
        console.error("Không thể lấy thông tin premium:", error);
      }
    };

    if (token) {
      fetchPremiumStatus();
    }
  }, [token]);

  const handleBuyPremium = async (badge: string) => {
    if (currentPremium) {
      alert(
        `Bạn đang sử dụng gói Audiva ${
          currentPremium.premiumName
        } đến ngày ${new Date(currentPremium.endDate).toLocaleDateString()}.`
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await api.post(
        `/identity/api/premium/buy?userId=${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
            premiumName: badge,
          },
        }
      );

      const data = (response.data as { result: any }).result;
      if (data) {
        window.location.href = data;
      }
    } catch (err) {
      console.error(err);
      setError("Giao dịch thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-container">
      <div className="container">
        <h1 className="header-title">Nâng cấp Premium</h1>
        <p className="header-description">
          Trải nghiệm âm nhạc không giới hạn với Audiva Premium
        </p>

        {currentPremium && (
          <div className="current-premium-info">
            <p>
              Bạn đang sử dụng gói{" "}
              <strong>Audiva {currentPremium.premiumName}</strong> đến ngày{" "}
              <strong>
                {new Date(currentPremium.endDate).toLocaleDateString()}
              </strong>
              .
            </p>
            <p>
              Nếu muốn đăng ký gói khác, vui lòng chờ đến khi gói hiện tại hết
              hạn.
            </p>
          </div>
        )}

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.cardClass}`}>
              <div className="pricing-header">
                <div className="pricing-title-row">
                  <h2 className="pricing-title">{plan.name}</h2>
                  <span className="pricing-badge">{plan.badge}</span>
                </div>
                <p className="pricing-description">{plan.description}</p>
                <div className="pricing-price">
                  <span className="price-amount">Chỉ từ {plan.price}</span>
                  <span className="price-period">{plan.period}</span>
                </div>
                <button
                  className={`pricing-button ${plan.buttonClass}`}
                  onClick={() => handleBuyPremium(plan.badge)}
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : plan.buttonText}
                </button>
              </div>

              <div className="pricing-content">
                <h4 className="features-title">Đặc quyền đặc biệt:</h4>
                <ul className="features-list">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <Check />
                      <span className="feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-cta">
          <div className="cta-card">
            <h3 className="cta-title">Bắt đầu dùng thử miễn phí</h3>
            <p className="cta-description">
              Trải nghiệm Premium hoàn toàn miễn phí trong 7 ngày đầu tiên. Hủy
              bất cứ lúc nào.
            </p>
            <button className="cta-button">Dùng thử 7 ngày miễn phí</button>
          </div>
        </div>

        <div className="footer-info">
          <p>Có thể hủy bất cứ lúc nào • Không cam kết dài hạn • Hỗ trợ 24/7</p>
        </div>
      </div>
    </div>
  );
}
