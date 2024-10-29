import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{
        textAlign: 'center',
        padding: '20px',
        backgroundImage: 'url("https://img.freepik.com/free-photo/old-newspaper-background-high-angle_23-2149318886.jpg?size=626&ext=jpg&ga=GA1.1.1819120589.1728345600&semt=ais_hybrid")', // Ensure to use a high-resolution image
        backgroundSize: 'cover', // Use cover to maintain the aspect ratio
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Prevent image repeat
        minHeight: '100vh', // Ensures full height coverage
    }}>
      <h1 style={{ color: '#001f3f' }}>Welcome to Our News Portal</h1>
      <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          marginTop: '20px',
      }}>
        {/* Card for Latest News */}
        <div style={{
            backgroundColor: '#444',
            borderRadius: '10px',
            width: '27.5%', // Increased width by 10%
            height: '330px', // Increased height by 10%
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
          <div style={{
              backgroundImage: 'url("https://www.shutterstock.com/image-vector/latest-news-poster-banner-graphic-600nw-2453491007.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '50%', // Set image height to half (50%)
          }} />
          <div style={{
              padding: '10px',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
          }}>
            <h3 style={{ color: 'white' }}>Latest News</h3>
            <p style={{ color: 'white' }}>Stay updated with the latest happenings from around the world.</p>
            <Link to="/news" style={{
                color: '#001f3f', // Updated color
                textDecoration: 'none',
                fontWeight: 'bold',
                marginTop: '10px',
            }}>Read More</Link>
          </div>
        </div>

        {/* Card for Regional News */}
        <div style={{
            backgroundColor: '#444',
            borderRadius: '10px',
            width: '27.5%', // Increased width by 10%
            height: '330px', // Increased height by 10%
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
          <div style={{
              backgroundImage: 'url("https://thumbs.dreamstime.com/b/news-concept-painted-blue-text-regional-news-torn-paper-background-hand-drawn-news-icons-news-concept-regional-news-113366981.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '50%', // Set image height to half (50%)
          }} />
          <div style={{
              padding: '10px',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
          }}>
            <h3 style={{ color: 'white' }}>Regional News</h3>
            <p style={{ color: 'white' }}>Explore the top headlines in your language.</p>
            <Link to="/tamilnews" style={{
                color: '#001f3f', // Updated color
                textDecoration: 'none',
                fontWeight: 'bold',
                marginTop: '10px',
            }}>Explore</Link>
          </div>
        </div>

        {/* Card for Other News */}
        <div style={{
            backgroundColor: '#444',
            borderRadius: '10px',
            width: '27.5%', // Increased width by 10%
            height: '330px', // Increased height by 10%
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
        }}>
          <div style={{
              backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe--DM7R7BmGlzJAdBZdW9wOp8XiUGEn8_3Q&s")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '50%', // Set image height to half (50%)
          }} />
          <div style={{
              padding: '10px',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
          }}>
            <h3 style={{ color: 'white' }}>World News</h3>
            <p style={{ color: 'white' }}>Catch up on various topics from around the globe.</p>
            <Link to="/countrynews" style={{
                color: '#001f3f', // Updated color
                textDecoration: 'none',
                fontWeight: 'bold',
                marginTop: '10px',
            }}>Discover</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
