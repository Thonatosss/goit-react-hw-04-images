import React, { useState} from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Triangle } from 'react-loader-spinner';
import { Modal } from 'components/Modal/Modal';
import { List } from './ImageGallery.styled';
import { LoadMoreButton } from 'components/LoadMoreButton/LoadMoreButton';
import { LoaderWrapper } from 'components/Loader/Loader.styled';



function ImageGallery({images, loadMore, status}) {
  const[showModal, setShowModal] = useState(false);
  const[currentImg, setCurrentImg] = useState('');

  const getModal = imgUrl => {
    setShowModal(true);
    setCurrentImg(imgUrl);
  };

  const hideModal = () => {
    setShowModal(false);
    setCurrentImg('')
  };


    if (status === 'pending') {
      return (
        <LoaderWrapper>
          <Triangle />
        </LoaderWrapper>
      );
    }

    if (status === 'rejected') {
      return <h1>Opps... Something went wrong :(</h1>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <List>
            {images.map(image => (
              <ImageGalleryItem
                key={image.id}
                imgUrl={image.webformatURL}
                onOpenModal={() => getModal(image.largeImageURL)}
              />
            ))}
          </List>
          <LoadMoreButton onClick={loadMore} />
          {showModal && (
            <Modal onCloseModal={hideModal} imgSrc={currentImg}></Modal>
          )}
        </div>
      );
    }
  }

export { ImageGallery };
