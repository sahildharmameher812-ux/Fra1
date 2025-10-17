const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  // NO CSP - Allow everything
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Frame-Options', 'DENY');

  // Serve the React app
  const indexPath = path.join(__dirname, '..', 'client', 'build', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, 'utf8');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } else {
    res.status(404).send('Not found');
  }
};
