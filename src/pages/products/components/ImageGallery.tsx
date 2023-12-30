const ImageGallery = ({ images }: { images: string[] }) => {
  return (
    <div>
      {images.map((image, index) => (
        <div
          key={index}
          className='relative group hover:opacity-80 opacity-100 transition-opacity duration-200 ease-in-out'
        >
          <img src={image} className='max-w-1/2 mx-auto max-h-[100px]' />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
