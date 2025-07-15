import type React from "react";

import { useEffect, useState } from "react";
import { Crown, Edit, Music, User } from "lucide-react";
import "@/components/UserProfile.css";
import { useAuthStore } from "@/stores/authStore";
import api from "@/utils/api";
import { formatDate } from "@/utils/helpers";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  console.log("User profile:", user);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Nguyễn Văn An",
    email: "nguyenvanan@email.com",
    password: "••••••••",
  });
  const token = useAuthStore((state) => state.token);

  type PremiumInfo = {
    status: string;
    plan: string;
    startDate: string;
    endDate: string;
  };

  const [premiumInfo, setPremiumInfo] = useState<PremiumInfo>({
    status: "inactive",
    plan: "Free",
    startDate: "N/A",
    endDate: "N/A",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
        password: "••••••••",
      });
      setEditForm({
        name: user.name,
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    type PremiumApiResponse = {
      status?: string;
      premiumName?: string;
      startDate?: string;
      endDate?: string;
    };

    const fetchPremiumInfo = async () => {
      try {
        const res = await api.get<PremiumApiResponse>(
          "/identity/user-premium/me"
        );
        setPremiumInfo({
          status: res.data?.status || "inactive",
          plan: res.data?.premiumName || "Free",
          startDate: res.data?.startDate || "N/A",
          endDate: res.data?.endDate || "N/A",
        });
      } catch (error) {
        console.error("Không thể tải thông tin Premium:", error);
        setPremiumInfo({
          status: "inactive",
          plan: "Free",
          startDate: "N/A",
          endDate: "N/A",
        });
      }
    };

    if (user) {
      fetchPremiumInfo();
    }
  }, [user]);

  const [editForm, setEditForm] = useState({
    name: userInfo.name,
    password: "",
  });

  const handleSave = async () => {
    setUserInfo({
      ...userInfo,
      name: editForm.name,
      password: editForm.password ? "••••••••" : userInfo.password,
    });

    await api.put(
      `/identity/users/${user?.id}`,
      {
        firstName: editForm.name,
        password: editForm.password || undefined,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setIsEditOpen(false);
    setEditForm({ name: editForm.name, password: "" });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsEditOpen(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-header-title">
            <Music className="profile-header-icon" />
            <h1 className="profile-header-text">Hồ Sơ Cá Nhân</h1>
          </div>
          <p className="profile-header-subtitle">
            Quản lý thông tin tài khoản của bạn
          </p>
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-avatar-container">
              <div className="profile-avatar">
                {userInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>
            <div className="profile-user-info">
              <h2 className="profile-user-name">{userInfo.name}</h2>
              <p className="profile-user-email">{userInfo.email}</p>
            </div>
          </div>

          <div className="profile-card-content">
            {/* Premium Status */}
            <div className="profile-premium">
              <div className="profile-premium-header">
                <div className="profile-premium-title">
                  <Crown className="profile-premium-icon" />
                  <span>Gói Premium</span>
                </div>
                <div className="profile-premium-badge">
                  {premiumInfo.status === "SUCCESS"
                    ? "Đang hoạt động"
                    : "Chưa kích hoạt / Hết hạn"}
                </div>
              </div>
              <h3 className="profile-premium-plan">
                Audiva {premiumInfo.plan}
              </h3>
              <div className="profile-premium-dates">
                <div>
                  <p className="profile-premium-date-label">Ngày đăng ký</p>
                  <p className="profile-premium-date-value">
                    {formatDate(premiumInfo.startDate)}
                  </p>
                </div>
                <div>
                  <p className="profile-premium-date-label">Ngày hết hạn</p>
                  <p className="profile-premium-date-value">
                    {formatDate(premiumInfo.endDate)}
                  </p>
                </div>
              </div>
            </div>

            <hr className="profile-separator" />

            {/* Account Information */}
            <div className="profile-account-section">
              <h3 className="profile-account-title">
                <User className="profile-account-icon" />
                Thông tin tài khoản
              </h3>

              <div className="profile-account-grid">
                <div className="profile-account-item">
                  <div>
                    <p className="profile-account-label">Tên hiển thị</p>
                    <p className="profile-account-value">{userInfo.name}</p>
                  </div>
                </div>

                <div className="profile-account-item">
                  <div>
                    <p className="profile-account-label">Email</p>
                    <p className="profile-account-value">{userInfo.email}</p>
                  </div>
                </div>

                <div className="profile-account-item">
                  <div>
                    <p className="profile-account-label">Mật khẩu</p>
                    <p className="profile-account-value">{userInfo.password}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              className="profile-button"
              onClick={() => setIsEditOpen(true)}
            >
              <Edit className="profile-button-icon" />
              Chỉnh sửa thông tin
            </button>
          </div>
        </div>

        {/* Premium Benefits */}
        <div className="profile-card">
          <div className="profile-card-header">
            <h3 className="profile-benefits-title">
              <Crown className="profile-benefits-crown" />
              Quyền lợi Premium
            </h3>
          </div>
          <div className="profile-card-content">
            <div className="profile-benefits-list">
              <div className="profile-benefits-item">
                <div className="profile-benefits-dot"></div>
                <span>Nghe nhạc chất lượng cao không giới hạn</span>
              </div>
              <div className="profile-benefits-item">
                <div className="profile-benefits-dot"></div>
                <span>Tải nhạc offline</span>
              </div>
              <div className="profile-benefits-item">
                <div className="profile-benefits-dot"></div>
                <span>Không có quảng cáo</span>
              </div>
              <div className="profile-benefits-item">
                <div className="profile-benefits-dot"></div>
                <span>Truy cập sớm các tính năng mới</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {isEditOpen && (
        <div
          className="profile-dialog-overlay"
          onClick={handleOverlayClick}
          title="Hộp thoại chỉnh sửa thông tin người dùng"
        >
          <div
            className="profile-dialog scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="profile-dialog-header">
              <h2 className="profile-dialog-title">✏️ Chỉnh sửa thông tin</h2>
              <p className="profile-dialog-description">
                Cập nhật tên hiển thị và mật khẩu của bạn một cách an toàn.
              </p>
            </div>

            <div className="profile-dialog-content">
              <div className="profile-dialog-field">
                <label htmlFor="name" className="profile-dialog-label">
                  👤 Tên hiển thị
                </label>
                <input
                  id="name"
                  className="profile-dialog-input"
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="VD: Nguyễn Văn A"
                />
              </div>

              <div className="profile-dialog-field">
                <label htmlFor="password" className="profile-dialog-label">
                  🔒 Mật khẩu mới
                </label>
                <input
                  id="password"
                  className="profile-dialog-input"
                  type="password"
                  value={editForm.password}
                  onChange={(e) =>
                    setEditForm({ ...editForm, password: e.target.value })
                  }
                  placeholder="Để trống nếu không đổi"
                />
              </div>
            </div>

            <div className="profile-dialog-footer">
              <button
                className="profile-dialog-button profile-dialog-button-outline"
                onClick={() => setIsEditOpen(false)}
              >
                ❌ Hủy
              </button>
              <button
                className="profile-dialog-button profile-dialog-button-primary"
                onClick={handleSave}
              >
                💾 Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
