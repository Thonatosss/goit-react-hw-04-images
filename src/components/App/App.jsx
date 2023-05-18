import React, { useState, useEffect} from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34587378-1709a2c174b77a7efdbc7c71b';
const IMG_PER_PAGE = 12;

function App() {
  const[searchQuery, setSearchQuerry] = useState('');
  const[images, setImages] = useState([]);
  const[page, setPage] = useState(1);
  const[status, setStatus] = useState('');
  const[imgPerPage, setImgPerPage] = useState(0);
  

  useEffect(() => {
   
    async function getImages() {
      try {
        const response = await axios.get(
          `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&per_page=${IMG_PER_PAGE}&page=${page}`
        );
        const newImages = response.data.hits;
        setImgPerPage(newImages.length);
      
        if (page === 1) {
          setImages(newImages);
        } else {
          setImages(prevImages => [...prevImages, ...newImages]);
        }
        setStatus('resolved');
        
      } catch (error) {
        setStatus('rejected');
      }
      
    }
    if (searchQuery !== '') {
      setStatus('pending');
      getImages();
    }
    
  },[page, searchQuery, imgPerPage])

 
  const loadMore = () => {
    setPage(prevPage => prevPage+1);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuerry(searchQuery);
    setPage(1);
    setImages([]);
  };
  const isLastPage = () => {
    return imgPerPage < IMG_PER_PAGE;
  };

    return (
      <div>
        <ToastContainer />
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} status={status} loadMore={loadMore} isLastPage={isLastPage}/>
      </div>
    );
  }

  export { App };
