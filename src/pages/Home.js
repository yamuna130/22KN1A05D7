import React, { useEffect } from 'react';
import URLForm from '../components/URLForm';
import LoggerMiddleware from '../components/LoggerMiddleware';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const Home = () => {
  const { shortcode } = useParams();

  useEffect(() => {
    if (shortcode) {
      const urls = JSON.parse(localStorage.getItem('urls')) || [];
      const match = urls.find(u => u.code === shortcode);

      if (!match) {
        alert('Shortcode not found.');
        return;
      }

      const expiryTime = new Date(match.expiry).getTime();
      const now = Date.now();

      if (now > expiryTime) {
        alert('This short URL has expired.');
        return;
      }

      // Redirect!
      window.location.href = match.original.startsWith('http')
        ? match.original
        : 'http://' + match.original;
    }
  }, [shortcode]);

  // If it's a normal visit, show the form
  if (shortcode) {
    return <Typography>Redirecting...</Typography>;
  }

  return (
    <>
      <LoggerMiddleware />
      <URLForm />
    </>
  );
};

export default Home;
