import React from 'react';
import './ArtistImageSection.css';

interface ArtistImageSectionProps {
    imageUrl: string;
    name: string;
}

const ArtistImageSection: React.FC<ArtistImageSectionProps> = ({ imageUrl, name }) => (
    <section className='artist-image-section'>
        <img
            src={imageUrl}
            alt={name}
            className='artist-image-banner'
        />
        <h2 className='artist-name-banner'>{name}</h2>
    </section>
);

export default ArtistImageSection;