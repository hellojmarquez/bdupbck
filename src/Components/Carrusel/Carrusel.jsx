import React, { useState, useEffect } from 'react';

const Carrusel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbnails, setThumbnails] = useState([]);

  const carouselItems = [
    'https://mdbcdn.b-cdn.net/img/new/slides/041.webp',
    'https://mdbcdn.b-cdn.net/img/new/slides/042.webp',
    'https://mdbcdn.b-cdn.net/img/new/slides/043.webp',
  ];

  const numThumbnailsToShow = 3; // Número de miniaturas a mostrar en el carrusel

  useEffect(() => {
    // Configura el intervalo para cambiar las miniaturas
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [carouselItems.length]);

  useEffect(() => {
    // Calcula el índice de la primera miniatura que debe mostrarse
    const firstThumbnailIndex = activeIndex;
    // Construye las miniaturas en orden, asegurándose de hacer el "rollo" cuando sea necesario
    const orderedThumbnails = [];
    for (let i = 0; i < numThumbnailsToShow; i++) {
      const index = (firstThumbnailIndex + i) % carouselItems.length;
      orderedThumbnails.push(carouselItems[index]);
    }
    setThumbnails(orderedThumbnails);
  }, [activeIndex, carouselItems, numThumbnailsToShow]);

  return (
    <div id="carouselExampleSlidesOnly" className="relative">
      {/* Miniaturas */}
      <div className="flex justify-center gap-7 mt-4">
        {thumbnails.map((item, index) => (
          <div
            key={index}
            className="rounded-lg overflow-hidden w-24 h-32"
          >
            <img src={item} className="block w-full h-full object-cover" alt={`Miniatura ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;
