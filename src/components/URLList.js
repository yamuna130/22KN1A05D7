import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Stack
} from '@mui/material';
import { ContentCopy, Delete } from '@mui/icons-material';

const URLList = () => {
  const [urls, setUrls] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('urls')) || [];
    setUrls(stored);
  }, []);

  // Copy to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied to clipboard: ${text}`);
  };

  // Delete URL by index
  const handleDelete = (indexToDelete) => {
    const updatedUrls = urls.filter((_, index) => index !== indexToDelete);
    localStorage.setItem('urls', JSON.stringify(updatedUrls));
    setUrls(updatedUrls);
  };

  if (urls.length === 0) {
    return <Typography>No URLs found.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>Shortened URLs</Typography>
      <Stack spacing={2}>
        {urls.map((url, idx) => (
          <Card key={idx} variant="outlined">
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                Original URL:
              </Typography>
              <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                {url.original}
              </Typography>

              <Typography variant="subtitle2" color="textSecondary" sx={{ mt: 2 }}>
                Shortened URL:
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <a href={url.short} target="_blank" rel="noreferrer">
                  {url.short}
                </a>
                <Tooltip title="Copy to Clipboard">
                  <IconButton onClick={() => copyToClipboard(url.short)} size="small">
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete URL">
                  <IconButton onClick={() => handleDelete(idx)} size="small" color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Expires: {url.expiry}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
};

export default URLList;
