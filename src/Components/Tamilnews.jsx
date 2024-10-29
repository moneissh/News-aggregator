// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './TamilNews.css'; // Custom CSS for Tamil News

// const TamilNews = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const apiKey = '15c09de60f5c41b1b927840500696f04'; // Replace with your API key
//   const baseUrl = `https://newsapi.org/v2/everything?q=tamil&language=ta&apiKey=${apiKey}`; // Use Tamil news endpoint

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const response = await axios.get(baseUrl);
//         if (response.data.articles && response.data.articles.length > 0) {
//           setArticles(response.data.articles);
//         } else {
//           setError('No articles available.');
//         }
//       } catch (err) {
//         setError('Failed to fetch Tamil news articles. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticles();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div className="tamil-news-page">
//       <h1>Tamil News</h1>
//       <div className="articles-container">
//         {articles.map((article) => (
//           <div key={article.url} className="article-card">
//             <h2>{article.title}</h2>
//             <p>{article.description}</p>
//             <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TamilNews;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TamilNews.css'; // Custom CSS for Tamil News

const TamilNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('tamil'); // Default search query

  const apiKey = '15c09de60f5c41b1b927840500696f04'; // Replace with your API key
  const baseUrl = `https://newsapi.org/v2/everything?q=${query}&language=ta&apiKey=${apiKey}`; // Use search query for dynamic search

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(baseUrl);
        if (response.data.articles && response.data.articles.length > 0) {
          setArticles(response.data.articles);
        } else {
          setError('No articles available.');
        }
      } catch (err) {
        setError('Failed to fetch Tamil news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query]); // Fetch articles whenever the query changes

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    if (searchQuery) {
      setQuery(searchQuery);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="tamil-news-page1">
      <h1>தமிழ் செய்திகள்</h1>

      {/* Search Form */}
      <form className="search-form1" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search news..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="articles-container1">
        {articles.map((article) => (
          <div key={article.url} className="article-card1">
            {article.urlToImage && (
              <img src={article.urlToImage} alt={article.title} className="article-image1" />
            )}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TamilNews;
