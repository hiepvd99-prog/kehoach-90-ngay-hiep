const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(express.json());
app.use(express.static(__dirname));

// helper to load/save file data
function loadData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { notes: [], kpi: {}, bh: {}, posts: {}, posts_list: [] };
  }
  try {
    const content = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(content);
  } catch (e) {
    return { notes: [], kpi: {}, bh: {}, posts: {}, posts_list: [] };
  }
}

function saveData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

// API Endpoints
app.get('/api/data', (req, res) => {
  res.json(loadData());
});

app.post('/api/notes', (req, res) => {
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ error: 'Missing user or text' });
  }
  const data = loadData();
  const newNote = {
    id: Date.now() + Math.random().toString(36).substr(2, 5),
    user,
    text,
    time: new Date().toISOString()
  };
  data.notes.unshift(newNote); // newest first
  if (data.notes.length > 50) { // limit log length
    data.notes = data.notes.slice(0, 50);
  }
  saveData(data);
  res.json({ success: true, note: newNote });
});

app.post('/api/sync', (req, res) => {
  const { kpi, bh, posts, posts_list } = req.body;
  const data = loadData();
  if (kpi) data.kpi = kpi;
  if (bh) data.bh = bh;
  if (posts) data.posts = posts;
  if (posts_list) data.posts_list = posts_list;
  saveData(data);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
