import fs from 'fs';
import path from 'path';

const galleryFile = './src/components/sub-pages/gallery/galleryData.js';
const imagesDir = './public/events/spreading-awareness';

const files = fs.readdirSync(imagesDir).filter(f => f !== 'NameUpdate.sh' && !f.startsWith('.'));

files.sort((a, b) => {
  const matchA = a.match(/\((\d+)\)/);
  const matchB = b.match(/\((\d+)\)/);
  const numA = matchA ? parseInt(matchA[1], 10) : 0;
  const numB = matchB ? parseInt(matchB[1], 10) : 0;
  return numA - numB;
});

const newEntries = files.map((file, i) => {
  return `  { id: "sa${i+1}", eventId: "5", src: "/events/spreading-awareness/${file}", w: 1600, h: 900, album: "Spreading Awareness", tags: ["Spreading Awareness", "Community"], title: "Spreading Awareness" },`;
});

let content = fs.readFileSync(galleryFile, 'utf8');

// remove previous spreading-awareness ones
const oldLines = `  { id: "a1", eventId: "5", src: "/events/spreading-awareness/a1.jpg", w: 1600, h: 900, album: "Spreading Awareness", tags: ["Spreading Awareness", "Community"], title: "Spreading Awareness" },
  { id: "a2", eventId: "5", src: "/events/spreading-awareness/a2.jpeg", w: 1600, h: 900, album: "Spreading Awareness", tags: ["Spreading Awareness", "Community"], title: "Spreading Awareness" },
  { id: "a3", eventId: "5", src: "/events/spreading-awareness/a3.jpeg", w: 1600, h: 900, album: "Spreading Awareness", tags: ["Spreading Awareness", "Community"], title: "Spreading Awareness" },
  { id: "a4", eventId: "5", src: "/events/spreading-awareness/a5.jpeg", w: 1600, h: 900, album: "Spreading Awareness", tags: ["Spreading Awareness", "Community"], title: "Spreading Awareness" },
  { id: "a5", eventId: "5", src: "/events/spreading-awareness/a6.jpeg", w: 1600, h: 900, album: "Spreading Awareness", tags: ["Spreading Awareness", "Community"], title: "Spreading Awareness" },
  { id: "a6", eventId: "5", src: "/events/spreading-awareness/a7.jpeg", w: 1600, h: 900, album: "Spreading Awareness", tags: ["Spreading Awareness", "Community"], title: "Spreading Awareness" },
  { id: "a7", eventId: "5", src: "/events/spreading-awareness/a8.jpeg", w: 1600, h: 900, album: "Spreading Awareness", tags: ["Spreading Awareness", "Community"], title: "Spreading Awareness" },`;

if (content.includes(oldLines)) {
  content = content.replace(oldLines, '');
} else {
  // Try regex if exact match fails
  content = content.replace(/  \{ id: "a\d+".*?\n/g, '');
}

const coverFile = files.find(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg')) || files[0];
content = content.replace(/\/events\/spreading-awareness\/a1\.jpg/, `/events/spreading-awareness/${coverFile}`);

content = content.trim();

if (content.endsWith('];')) {
  content = content.substring(0, content.length - 2) + newEntries.join('\n') + '\n];\n';
}

fs.writeFileSync(galleryFile, content, 'utf8');
console.log('Update complete!');
