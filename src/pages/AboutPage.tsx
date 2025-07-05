import { Music, Users, Heart } from "lucide-react";
import "./AboutPage.css";

const AboutPage = () => {
  const values = [
    {
      icon: <Music className="about-value-icon" />,
      title: "Sứ mệnh",
      description:
        "Kết nối mọi người thông qua âm nhạc và tạo ra những trải nghiệm âm nhạc tuyệt vời nhất.",
    },
    {
      icon: <Users className="about-value-icon" />,
      title: "Tầm nhìn",
      description:
        "Trở thành nền tảng âm nhạc hàng đầu, nơi nghệ sĩ và người yêu nhạc gặp gỡ.",
    },
    {
      icon: <Heart className="about-value-icon" />,
      title: "Giá trị",
      description:
        "Đam mê âm nhạc, sáng tạo không giới hạn và kết nối cộng đồng âm nhạc.",
    },
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        {/* Header */}
        <div className="about-page-header">
          <h1 className="about-page-title">Về Audiva</h1>
          <p className="about-page-description">
            Khám phá câu chuyện đằng sau nền tảng âm nhạc kết nối triệu trái tim
          </p>
        </div>

        {/* Story Section */}
        <section className="about-story-section">
          <div className="about-story-content">
            <div className="about-story-text">
              <h2 className="about-story-title">Câu chuyện của chúng tôi</h2>
              <p className="about-story-paragraph">
                Audiva ra đời từ niềm đam mê âm nhạc và mong muốn tạo ra một
                không gian nơi mọi người có thể khám phá, chia sẻ và tận hưởng
                âm nhạc một cách trọn vẹn nhất.
              </p>
              <p className="about-story-paragraph">
                Chúng tôi tin rằng âm nhạc có sức mạnh kết nối con người, vượt
                qua mọi rào cản về ngôn ngữ, văn hóa và khoảng cách. Với Audiva,
                chúng tôi mong muốn mang đến trải nghiệm âm nhạc tuyệt vời nhất
                cho mọi người.
              </p>
            </div>
            <div className="about-story-image">
              <img
                src="https://cdn.shopify.com/s/files/1/0657/3100/2634/files/papierpeintmusique-casqueaudio.png?v=1715586351"
                alt="Audiva music story"
                className="about-story-img"
              />
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="about-values-section">
          <h2 className="about-section-title">Giá trị cốt lõi</h2>
          <div className="about-values-grid">
            {values.map((value, index) => (
              <div key={index} className="about-value-card">
                <div className="about-value-content">
                  {value.icon}
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-description">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="about-stats-section">
          <div className="about-stats-card">
            <div className="about-stats-grid">
              <div className="about-stat-item">
                <div className="about-stat-number">1M+</div>
                <div className="about-stat-label">Người dùng</div>
              </div>
              <div className="about-stat-item">
                <div className="about-stat-number">50K+</div>
                <div className="about-stat-label">Bài hát</div>
              </div>
              <div className="about-stat-item">
                <div className="about-stat-number">1K+</div>
                <div className="about-stat-label">Nghệ sĩ</div>
              </div>
              <div className="about-stat-item">
                <div className="about-stat-number">24/7</div>
                <div className="about-stat-label">Âm nhạc</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
