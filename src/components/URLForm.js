import React, { useState } from 'react';
import { TextField, Button, Card, Typography } from '@mui/material';
import { shortenURL } from '../utils/urlService';
import { validateURL, validateMinutes } from '../utils/validators';

const URLForm = () => {
  const [inputs, setInputs] = useState([
    { url: '', validity: '', shortcode: '' },
  ]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleAddRow = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = () => {
    const shortened = inputs.map(input => {
      if (!validateURL(input.url)) {
        alert('Invalid URL format.');
        return null;
      }

      if (input.validity && !validateMinutes(input.validity)) {
        alert('Validity must be an integer (minutes).');
        return null;
      }

      return shortenURL(input.url, input.validity, input.shortcode);
    }).filter(Boolean);

    setResults(shortened);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      {inputs.map((input, idx) => (
        <Card key={idx} style={{ margin: '10px', padding: '10px' }}>
          <TextField
            label="Long URL"
            fullWidth
            margin="dense"
            value={input.url}
            onChange={(e) => handleChange(idx, 'url', e.target.value)}
          />
          <TextField
            label="Validity (minutes)"
            fullWidth
            margin="dense"
            value={input.validity}
            onChange={(e) => handleChange(idx, 'validity', e.target.value)}
          />
          <TextField
            label="Preferred Shortcode"
            fullWidth
            margin="dense"
            value={input.shortcode}
            onChange={(e) => handleChange(idx, 'shortcode', e.target.value)}
          />
        </Card>
      ))}
      <Button onClick={handleAddRow}>Add Another</Button>
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="h5">Shortened Links</Typography>
        {results.map((res, idx) => (
          <div key={idx}>
            <a href={res.short} target="_blank" rel="noreferrer">{res.short}</a> (Expires in {res.validity} min)
          </div>
        ))}
      </div>
    </div>
  );
};

export default URLForm;
