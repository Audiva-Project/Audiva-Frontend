"use client"

import { Link } from "react-router-dom"
import Button from "@/components/ui/Button"
import { Home, ArrowLeft } from "lucide-react"
import "./NotFoundPage.css"

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-illustration">
            <div className="error-code">404</div>
            <img
              src="/placeholder.svg?height=300&width=400"
              alt="Page not found illustration"
              className="not-found-img"
            />
          </div>

          <div className="not-found-text">
            <h1 className="not-found-title">Trang không tồn tại</h1>
            <p className="not-found-description">
              Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
            </p>

            <div className="not-found-actions">
              <Button size="lg" onClick={() => window.history.back()}>
                <ArrowLeft size={20} />
                Quay lại
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg">
                  <Home size={20} />
                  Trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
