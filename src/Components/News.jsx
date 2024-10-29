import React, { useEffect, useState } from 'react';
import axios from 'axios';
const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const apiKey = '2c93a9a0a64a45df88de5518f1683cc3';
  const baseUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

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
        setError('Failed to fetch news articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error('Speech recognition is not supported in this browser.');
      alert('Sorry, your browser does not support voice search. Please use Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log('Voice recognition started. Speak now.');
      alert('Voice recognition started. Please speak.');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      console.log('Voice input recognized: ', transcript);
      alert(`Searching for: ${transcript}`);
      fetchArticlesByVoice(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error: ', event.error);
      alert(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      console.log('Voice recognition ended.');
      alert('Voice recognition ended.');
    };

    recognition.start();
  };

  const fetchArticlesByVoice = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`);
      if (response.data.articles && response.data.articles.length > 0) {
        setArticles(response.data.articles);
      } else {
        setError('No articles available for this search query.');
      }
    } catch (err) {
      setError('Failed to fetch news articles for this search query.');
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '1.5em' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red', fontSize: '1.2em' }}>{error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '2.5em', color: '#333' }}>Latest News</h1>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: '10px',
              width: '300px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button onClick={handleVoiceSearch} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}>
           
          </button>
        </div>
      </header>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
      }}>
        {filteredArticles.map((article) => (
          <div key={article.url} style={{
            backgroundColor: '#f8f8f8',
            width: '300px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
          }}>
            <img
              src={article.urlToImage || 'https://via.placeholder.com/300x200'}
              alt={article.title || 'No Title Available'}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '15px' }}>
              <h2 style={{
                fontSize: '1.2em',
                color: '#333',
                marginBottom: '10px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}>{article.title || 'No Title Available'}</h2>
              <p style={{ fontSize: '0.9em', color: '#555', marginBottom: '10px' }}>
                Published: {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })} at {new Date(article.publishedAt).toLocaleTimeString()}
              </p>
              <p style={{ fontSize: '0.9em', color: '#777', marginBottom: '15px' }}>
                {article.description || 'No description available.'}
              </p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
