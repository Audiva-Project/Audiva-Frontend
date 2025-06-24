import React from 'react';
import './GenreCard.css'

interface Genre {
  id: string;
  name: string;
  coverUrl?: string;
}

interface GenreCardProps {
  genre: Genre;
}

const GenreCard: React.FC<GenreCardProps> = ({ genre }) => {
  const { name, coverUrl } = genre;

  return (
    <div className="genre-card">
      <div className='genre-image-container'> 
        <img src={coverUrl} alt={name} className="genre-image" />
      </div>
      <span className="font-medium">{name}</span>
    </div>
  );
};

export default GenreCard;
