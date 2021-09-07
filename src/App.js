import { useState, useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import ImageGallery from "./components/ImageGallery";
import Searchbar from "./components/Searchbar";
import imagesApi from "./components/pixabay-api";
import Button from "./components/Button";
import Modal from "./components/Modal";
import styles from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetchImages = () => {
    const options = {
      searchQuery,
      currentPage,
    };

    setIsLoading(true);

    imagesApi
      .fetchImages(options)
      .then((hits) => {
        setImages([...images, ...hits]);
        setCurrentPage(currentPage + 1);

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (searchQuery === "") {
      return;
    }

    fetchImages();
  }, [searchQuery]);

  const toggleModal = () => {
    setShowModal(false);
    setImageURL("");
  };

  const openModal = (largeImageURL) => {
    setShowModal(true);
    setImageURL(largeImageURL);
  };

  const onChangeQuery = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const shouldRenderLoadMoreButton = images.length > 0 && !isLoading;

  return (
    <div className={styles.app}>
      {error && <h1>Ой ошибка</h1>}

      <Searchbar onSubmit={onChangeQuery} />

      <ImageGallery images={images} onImgClick={openModal} />

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={imageURL} alt="" />
        </Modal>
      )}
      {isLoading && (
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      )}

      {shouldRenderLoadMoreButton && <Button onClick={fetchImages} />}
    </div>
  );
};

export default App;
