"use client"

import type React from "react"

import { useState } from "react"
import Button from "@/components/ui/Button"
import Card from "@/components/ui/Card"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import "./ContactPage.css"

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.")
    setFormData({ name: "", email: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: <Mail className="contact-icon" />,
      title: "Email",
      value: "info@audiva.com",
      link: "mailto:info@audiva.com",
    },
    {
      icon: <Phone className="contact-icon" />,
      title: "Điện thoại",
      value: "+84 123 456 789",
      link: "tel:+84123456789",
    },
    {
      icon: <MapPin className="contact-icon" />,
      title: "Địa chỉ",
      value: "123 Đường ABC, Quận 1, TP.HCM",
      link: "#",
    },
  ]

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Liên hệ với chúng tôi</h1>
          <p className="page-description">Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn</p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <div className="contact-form-section">
            <Card className="contact-form-card">
              <h2 className="form-title">Gửi tin nhắn</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Chủ đề
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Tin nhắn *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" size="lg" loading={isSubmitting} className="submit-btn">
                  <Send size={20} />
                  {isSubmitting ? "Đang gửi..." : "Gửi tin nhắn"}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="contact-info-section">
            <div className="contact-info-cards">
              {contactInfo.map((info, index) => (
                <Card key={index} className="contact-info-card">
                  <div className="contact-info-content">
                    {info.icon}
                    <div className="contact-info-text">
                      <h3 className="contact-info-title">{info.title}</h3>
                      <a href={info.link} className="contact-info-value">
                        {info.value}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Map placeholder */}
            <Card className="map-card">
              <div className="map-placeholder">
                <img src="/placeholder.svg?height=300&width=400" alt="Map location" className="map-image" />
                <div className="map-overlay">
                  <h3>Vị trí của chúng tôi</h3>
                  <p>123 Đường ABC, Quận 1, TP.HCM</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
