import { Helmet } from 'react-helmet';
import { useEffect, useState } from 'react';
import { getImageByQuery } from 'js/api/pixabay';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ImageNotFound } from './ImageNotFound/ImageNotFound';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const perPage = 12;
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const getImages = async (query = '', params = {}) => {
    try {
      setIsLoading(true);
      const imageData = await getImageByQuery(query, params);
      setData(prev => (prev ? [...prev, ...imageData] : [...imageData]));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    handleImageQuery(query);
    getImages(query, { per_page: perPage, page: 1 });
  }, [query]);

  useEffect(() => {
    if (page !== 1) {
      getImages('', { per_page: perPage, page });
    }
  }, [page]);

  const handleImageQuery = query => {
    setQuery(query);
    setData([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const onOpenModal = e => {
    const targetId = e.currentTarget.dataset.id;
    showModal(targetId);
  };

  const showModal = id => {
    const modalData = data.find(item => item.id === Number(id));

    setIsShowModal(true);
    setModalData(modalData);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Helmet>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Helmet>
      <Searchbar requestQuery={query} handleImageQuery={handleImageQuery} />
      <ImageNotFound
        query={query}
        dataLength={data.length}
        isLoading={isLoading}
      />
      <ImageGallery data={data} onOpenModal={onOpenModal} />
      <Loader isLoading={isLoading} />
      <Button handleLoadMore={handleLoadMore} dataLength={data.length} />
      {isShowModal && <Modal data={modalData} onClose={closeModal} />}
    </>
  );
};
