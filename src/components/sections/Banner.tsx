import type React from "react";
import "./Banner.css";

interface BannerProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  className?: string;
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  backgroundImage,
  className = "",
}) => {
  return (
    <div
      className={`banner ${className}`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      <div className="banner-overlay"></div>
      <div className="banner-content">
        <div className="banner-text">
          <h1 className="banner-title">{title}</h1>
          {subtitle && <p className="banner-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="banner-accent"></div>
    </div>
  );
};

export default Banner;
