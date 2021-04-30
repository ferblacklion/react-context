import React, { useEffect, useState } from 'react';
const baseUrl = 'https://images.unsplash.com/';
const queryParams = '?auto=format&fit=crop&w=450&q=100';
const queryParamsThum = '?auto=format&fit=crop&w=100&q=100';

const images = [
  { id: 0, url: 'photo-1475700262322-d2d5adb9e26f', alt: 'cute dog' },
  { id: 1, url: 'photo-1459541708374-6fe9eea39a29', alt: 'guinea pig' },
  { id: 2, url: 'photo-1571198317078-76a4b545b2c1', alt: 'night' },
  { id: 3, url: 'photo-1553301139-3c610dd5b1cb', alt: 'beach' },
];

const Image = ({ image, className }) => {
  const unsplashUrl =
    baseUrl +
    image.url +
    (className === 'thumbnail' ? queryParamsThum : queryParams);
  return <img src={unsplashUrl} alt="img" className={className} />;
};

const Thumbnails = ({ active, images }) => {
  return (
    <div className="thumbnails">
      {images.map((image) => {
        let className = 'thumbnail';
        if (image.id === active) {
          className += ' thumbnail--active';
        }
        return <Image image={image} key={image.id} className={className} />;
      })}
    </div>
  );
};

const Button = ({ children, onClick }) => {
  return (
    <button className="button -green center" onClick={onClick}>
      {children}
    </button>
  );
};

const ImageGallery = () => {
  const [index, setIndex] = useState(0);
  const len = images.length;
  const [playing, setPlaying] = useState(false);

  const onNext = () => {
    setIndex(index === len - 1 ? 0 : index + 1);
  };
  const onPrev = () => {
    setIndex(index === 0 ? len - 1 : index - 1);
  };

  useEffect(() => {
    if (playing) {
      const timer = setInterval(() => {
        setIndex(index === len - 1 ? 0 : index + 1);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [index, len, playing]);

  return (
    <div className="image-gallery">
      <div className="front-image">
        <Image image={images[index]} />
      </div>
      <Thumbnails active={images[0].id} images={images} />
      <div className="actions button-container">
        <Button onClick={onPrev}>Prev</Button>
        <Button onClick={() => setPlaying(!playing)}>Play</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

export default ImageGallery;
