const fs = require('node:fs');
const path = require('node:path');
const folder = path.join(__dirname, '..', 'assets', 'albums');
fs.mkdirSync(folder, { recursive: true });
const photos = fs.readdirSync(folder, { withFileTypes: true })
  .filter(entry => entry.isFile() && /\.(jpe?g|png|webp|avif|gif)$/i.test(entry.name))
  .map(entry => entry.name)
  .sort((a, b) => a.localeCompare(b, 'vi', { numeric: true }))
  .map((name, index) => ({
    src: `assets/albums/${encodeURIComponent(name)}`,
    alt: `Ảnh cưới ${index + 1}`,
    caption: ''
  }));
fs.writeFileSync(path.join(folder, 'manifest.js'), `// Tự động tạo bởi scripts/build-album.cjs\nwindow.WEDDING.album = ${JSON.stringify(photos, null, 2)};\n`);
console.log(`Album: ${photos.length} ảnh`);
