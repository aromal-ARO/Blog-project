import React, { useState, useEffect } from 'react';

const News = () => {
  const [value, setValue] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('general');

  const api = async () => {
    let response = await fetch(`https://newsapi.org/v2/top-headlines?category=${category}&q=${query}&apiKey=2fa1039c7cbe45baa0f93b35233a6252`);
    let result = await response.json();
    console.log(result);
    console.log(result.articles);
    setValue(result.articles);
  };

  useEffect(() => {
    api();
  }, [category, query]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    api();
  };

  return (
    <>
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            {['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'].map((cat) => (
              <button
                key={cat}
                className={`text-white ${category === cat ? 'font-bold' : ''}`}
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
              placeholder="Search news..."
            />
            <button type="submit" className="px-4 py-2 bg-white text-black rounded">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div className="grid gap-4 lg:grid-cols-4 p-4">
        {value.map((a, key) => (
          <div className="w-full rounded-lg shadow-md lg:max-w-sm bg-gray-900 text-white" key={key}>
            <img
              className="object-cover w-full h-48 rounded-t-lg"
              src={a.urlToImage}
              alt="image"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold">
                {a.title}
              </h4>
              <p className="mb-2 leading-normal">
                {a.content}
              </p>
              <a href={a.url} className="px-4 py-2 text-sm text-black bg-white rounded shadow">
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;