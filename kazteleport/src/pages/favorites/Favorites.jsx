import React, { useState, useEffect } from "react";
import Picture from "../../components/photo-block/Picture";

const Favorites = () => {
    const [likedPhotos, setLikedPhotos] = useState([]);

    useEffect(() => {
        const storedLikedPhotos =
            JSON.parse(localStorage.getItem("likedPhotos")) || [];
        setLikedPhotos(storedLikedPhotos);
    }, []);

    const fetchLikedPhotoDetails = async (photoId) => {
        const accessKey = import.meta.env.VITE_ACCESS_KEY;
        const apiUrl = `https://api.unsplash.com/photos/${photoId}/?client_id=${accessKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching photo details from Unsplash:", error);
        }
    };

    const [likedPhotosDetails, setLikedPhotosDetails] = useState([]);


    useEffect(() => {
        const fetchDetails = async () => {
            const details = await Promise.all(
                likedPhotos.map((photoId) => fetchLikedPhotoDetails(photoId))
            );
            setLikedPhotosDetails(details.filter((detail) => detail)); 
        };

        fetchDetails();
    }, [likedPhotos]);

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold my-8">Избранное</h1>
            <div className="w-full flex flex-col items-center align-middle md:flex-row md:flex-wrap md:justify-center md:w-4/5 max-w-[1200px]">
                {likedPhotosDetails.map((photo) => (
                    <div  key={photo.id}>
                        <Picture
                            src={photo.urls.regular}
                            alt={photo.alt_description}
                            photoId={photo.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Favorites;
