import React, { useState, useEffect } from 'react'
import './ArtistImageSection.css'
import api from '@/utils/api'

interface ArtistImageSectionProps {
  imgUrl: string
  name: string
}

interface Artist {
  id: number
  name: string
  avatar?: string
  // Add other artist properties if needed
}

const ArtistImageSection: React.FC<ArtistImageSectionProps> = ({ imgUrl, name } ) => {
  return (
    <section className='artist-image-section'>
      <img
        src={imgUrl ? imgUrl : 'https://via.placeholder.com/150'}
        alt={name}
        className='artist-image-banner'
      />
      <h2 className='artist-name-banner'>{name}</h2>
    </section>
  )
}

export default ArtistImageSection
