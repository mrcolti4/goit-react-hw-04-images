import { Helmet } from 'react-helmet';
import { Component } from 'react';
import { getImageByQuery } from 'js/api/pixabay';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ImageNotFound } from './ImageNotFound/ImageNotFound';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  static perPage = 12;
  state = {
    data: [],
    query: '',
    page: 1,
    isLoading: false,
    isShowModal: false,
    modalData: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages({ q: this.state.query, per_page: App.perPage, page });
    }
    if (prevState.query !== query) {
      this.handleImageQuery(query);
      this.setState({ data: [], page: 1 });
    }
  }

  getImages = async (params = {}) => {
    try {
      this.setState({ isLoading: true });
      const data = await getImageByQuery(params);
      this.setState(prev => ({
        data: prev.data ? [...prev.data, ...data] : [...data],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleImageQuery = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  onOpenModal = e => {
    const targetId = e.currentTarget.dataset.id;
    this.showModal(targetId);
  };

  showModal = id => {
    const { data } = this.state;
    const modalData = data.find(item => item.id === Number(id));

    this.setState(prev => ({ isShowModal: !prev.isShowModal, modalData }));
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  render() {
    const { data, query, isLoading, modalData } = this.state;
    return (
      <>
        <Helmet>
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
        </Helmet>
        <Searchbar handleImageQuery={this.handleImageQuery} />
        <ImageNotFound
          query={query}
          dataLength={data.length}
          isLoading={isLoading}
        />
        <ImageGallery data={data} onOpenModal={this.onOpenModal} />
        <Loader isLoading={isLoading} />
        <Button handleLoadMore={this.handleLoadMore} dataLength={data.length} />
        {this.state.isShowModal && (
          <Modal data={modalData} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
