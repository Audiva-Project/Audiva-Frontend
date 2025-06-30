import React, { useEffect, useState } from "react";
import "./ArtistPage.css";
import { Link } from "react-router-dom";

type Artist = {
    id: number;
    name: string;
    avatarUrl?: string;
    bio?: string;
};

const ArtistPage: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch("http://localhost:8080/identity/artists", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJjaGluaC5jb20iLCJzdWIiOiJodXkyIiwiZXhwIjoxNzU0MzM5MTIwLCJpYXQiOjE3NTEwOTkxMjAsImp0aSI6IjI1ZWNiOTBmLWI1NGQtNDE4OC04OWVjLWI2MDkxMzMyM2NkOSIsInNjb3BlIjoiIn0.Gma3ok8K54kAc9UJLm94PIpxDX_qCkr7lyEBo60rKT7cMoFsAHVBXD1kQGiq2FW18VUojn5zxmRVylSW2wAarw`
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setArtists(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading artists...</div>;

    return (
        <div className="artist-page">
            <h1 className="section-title">Artists List</h1>
            <div className="artist-list">
                {artists.map((artist) => (
                    <div className="artist-card" key={artist.id}>
                        <Link
                            key={artist.id}
                            to={`/artists/${artist.id}`}
                            className="artist-link"
                        >
                            <div className="artist-image-container">
                                <img
                                    src={`http://localhost:8080/identity/audio/${artist.avatar}`}
                                    alt={artist.name}
                                    className="artist-image"
                                />
                            </div>
                            <h2 className="artist-name">{artist.name}</h2>
                            <p className="artist-bio">{artist.bio}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ArtistPage;
