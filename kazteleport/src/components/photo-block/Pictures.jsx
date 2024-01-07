import React, { useState, useEffect, useRef } from 'react';
import Search from "../search-section/Search";
import Picture from './Picture';
import Loading from '/assets/loading-anim.gif';
import NoImage from '/assets/no-image.gif';

const Pictures = () => {
  const [photos, setPhotos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isExist, setIsExist] = useState(true);
  const [searchQuery, setSearchQuery] = useState('paintings');
  const loaderRef = useRef(null);
  const accessKey = import.meta.env.VITE_ACCESS_KEY;
  const perPage = import.meta.env.VITE_PER_PAGE;
  

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const apiUrl = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${searchQuery}&per_page=${perPage}&page=${page}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
      
        if(data.total==0){
          setIsExist(false)
          return;
        }
        setIsExist(true)
        setPhotos((prevPhotos) => [...prevPhotos, ...data.results]);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error('Error fetching photos from Unsplash:', error);
      } finally {
        setLoading(false);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchPhotos();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page, searchQuery]);

  const handleSearch = (newSearchQuery) => {
    setPhotos([]);
    setPage(1);
    setSearchQuery(newSearchQuery);
  };

  return (
    <div className="flex flex-col items-center">
      <Search onSearch={handleSearch} />
      <div className="w-full flex flex-col items-center align-middle mt-4 md:flex-row md:flex-wrap md:justify-center md:w-4/5">
        {isExist ? 
        photos.map((photo) => (
          <Picture key={photo.id} src={photo.urls.regular} alt={photo.alt_description} />
        ))
      : 
      <div>
        <img src={NoImage} alt='images not found.gif' />
      </div>
      }
        
      </div>
      <div ref={loaderRef} style={{ height: '10px' }} />
      {isLoading && <img src={Loading} alt="loading" />}
    </div>
  );
};

export default Pictures;
