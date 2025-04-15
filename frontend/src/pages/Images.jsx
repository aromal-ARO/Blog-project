import React, { useState, useEffect } from 'react';

const Images = () => {
  const [query, setQuery] = useState('general');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImagesAndVideos = async () => {
    setLoading(true);
    const imageResponse = await fetch(`https://pixabay.com/api/?key=36332566-8bc088fe2a92e9b40057d23c2&q=${query}&image_type=photo`);
    const imageResult = await imageResponse.json();
    setImages(imageResult.hits);

    const videoResponse = await fetch(`https://pixabay.com/api/videos/?key=36332566-8bc088fe2a92e9b40057d23c2&q=${query}`);
    const videoResult = await videoResponse.json();
    setVideos(videoResult.hits);
    setLoading(false);
  };

  useEffect(() => {
    fetchImagesAndVideos();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchImagesAndVideos();
  };

  const handleCategoryChange = (category) => {
    setQuery(category);
    fetchImagesAndVideos();
  };

  return (
    <>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            {['nature', 'technology', 'people', 'animals', 'travel', 'food'].map((cat) => (
              <button
                key={cat}
                className="text-white"
                onClick={() => handleCategoryChange(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-4 py-2 rounded bg-gray-800 text-white"
              placeholder="Search images and videos..."
            />
            <button type="submit" className="px-4 py-2 bg-white text-black rounded">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="w-full rounded-lg shadow-md bg-gray-900 text-white">
                <img
                  className="object-cover w-full h-48 rounded-t-lg"
                  src={image.webformatURL}
                  alt={image.tags}
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold">
                    {image.user}
                  </h4>
                  <p className="mb-2 leading-normal">
                    {image.tags}
                  </p>
                  <a href={image.pageURL} className="px-4 py-2 text-sm text-black bg-white rounded shadow">
                    View
                  </a>
                </div>
              </div>
            ))}
            {videos.map((video) => (
              <div key={video.id} className="w-full rounded-lg shadow-md bg-gray-900 text-white">
                <video className="object-cover w-full h-48 rounded-t-lg" controls>
                  <source src={video.videos.medium.url} type="video/mp4" />
                </video>
                <div className="p-4">
                  <h4 className="text-xl font-semibold">
                    {video.user}
                  </h4>
                  <p className="mb-2 leading-normal">
                    {video.tags}
                  </p>
                  <a href={video.pageURL} className="px-4 py-2 text-sm text-black bg-white rounded shadow">
                    View
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Images;