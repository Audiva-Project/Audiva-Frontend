import React from 'react';
import './GenreCard.css'

interface Genre {
  id: string;
  name: string;
  thumbnailUrl?: string;
}

interface GenreCardProps {
  genre: Genre;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  const { name, thumbnailUrl } = genre;

  return (
    <div className="genre-card">
      <div className='genre-image-container'>
        <img src={`http://localhost:8080/identity/audio/${thumbnailUrl}`}
          alt={name}
          className="genre-image" />
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default GenreCard;
