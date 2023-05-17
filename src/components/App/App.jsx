import React, { useState, useEffect } from 'react';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '34587378-1709a2c174b77a7efdbc7c71b';

function App() {
  const[searchQuery, setSearchQuerry] = useState('');
  const[images, setImages] = useState([]);
  const[page, setPage] = useState(1);
  const[status, setStatus] = useState('');

  useEffect(() => {
    if (searchQuery !== '') {
      setImages([]);
      setPage(1);
      setStatus('pending');
      getImages();
    }
    
  },[searchQuery])

  async function getImages() {
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&per_page=12&page=${page}`
      );
      const newImages = response.data.hits;

      setImages(prevImg =>  [...prevImg, ...newImages]);
      setStatus('resolved');
    
    } catch (error) {
      setStatus('rejected');
    }
  }

  const loadMore = () => {
    setPage(prevPage => prevPage+1);
    getImages();
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuerry(searchQuery)
  };

    return (
      <div>
        <ToastContainer />
        <SearchBar onSubmit={handleFormSubmit} />
        <ImageGallery images={images} status={status} loadMore={loadMore} />
      </div>
    );
  }

  export { App };
