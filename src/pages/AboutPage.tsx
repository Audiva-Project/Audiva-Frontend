import Card from "@/components/ui/Card"
import { Users, Target, Award } from "lucide-react"
import "./AboutPage.css"

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="value-icon" />,
      title: "Sứ mệnh",
      description: "Cung cấp giải pháp công nghệ tốt nhất để giúp doanh nghiệp phát triển bền vững.",
    },
    {
      icon: <Users className="value-icon" />,
      title: "Tầm nhìn",
      description: "Trở thành đối tác công nghệ đáng tin cậy hàng đầu trong khu vực.",
    },
    {
      icon: <Award className="value-icon" />,
      title: "Giá trị",
      description: "Chất lượng, đổi mới và cam kết phục vụ khách hàng tốt nhất.",
    },
  ]

  return (
    <div className="about-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Về chúng tôi</h1>
          <p className="page-description">Tìm hiểu thêm về Audiva và hành trình phát triển của chúng tôi</p>
        </div>

        {/* Story Section */}
        <section className="story-section">
          <div className="story-content">
            <div className="story-text">
              <h2 className="story-title">Câu chuyện của chúng tôi</h2>
              <p className="story-paragraph">
                Audiva được thành lập với mục tiêu mang đến những giải pháp công nghệ hiện đại và hiệu quả cho các doanh
                nghiệp. Chúng tôi tin rằng công nghệ có thể thay đổi cách thức hoạt động và phát triển của mọi tổ chức.
              </p>
              <p className="story-paragraph">
                Với đội ngũ chuyên gia giàu kinh nghiệm và đam mê công nghệ, chúng tôi cam kết cung cấp những sản phẩm
                và dịch vụ chất lượng cao, đáp ứng nhu cầu đa dạng của khách hàng.
              </p>
            </div>
            <div className="story-image">
              <img src="/placeholder.svg?height=400&width=500" alt="Our story" className="story-img" />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2 className="section-title">Giá trị cốt lõi</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <Card key={index} className="value-card">
                <div className="value-content">
                  {value.icon}
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <Card className="stats-card">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Khách hàng</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Dự án</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">5+</div>
                <div className="stat-label">Năm kinh nghiệm</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Hỗ trợ</div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
