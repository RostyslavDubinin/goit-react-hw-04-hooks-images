import React from "react";
import styles from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ image, tags, largeImageURL, onClickModal }) => {
  return (
    <li className={styles.imageGalleryItemImage}>
      <img
        className={styles.imageGalleryItemImage}
        src={image}
        alt={tags}
        onClick={() => onClickModal(largeImageURL)}
      />
    </li>
  );
};

export default ImageGalleryItem;
