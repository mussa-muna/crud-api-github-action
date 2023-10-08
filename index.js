const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Sample data (for testing purposes)
let data = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

app.get('/api/items', (req, res) => {
  res.json(data);
});

app.post('/api/items', (req, res) => {
  const newItem = req.body;
  data.push(newItem);
  res.json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = data.findIndex(item => item.id === itemId);
  if (index !== -1) {
    data[index] = updatedItem;
    res.json(updatedItem);
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const index = data.findIndex(item => item.id === itemId);
  if (index !== -1) {
    data.splice(index, 1);
    res.send('Item deleted');
  } else {
    res.status(404).send('Item not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
