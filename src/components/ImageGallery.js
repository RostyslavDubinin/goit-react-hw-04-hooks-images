import React from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "./ImageGalleryItem";

const ImageGallery = ({ images, onImgClick }) => (
  <ul className={styles.imageGallery}>
    {images.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        image={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        onClickModal={onImgClick}
      />
    ))}
  </ul>
);

export default ImageGallery;
