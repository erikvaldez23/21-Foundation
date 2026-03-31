import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryFile = path.join(__dirname, 'src/components/sub-pages/gallery/galleryData.js');
let content = fs.readFileSync(galleryFile, 'utf8');

const photoItemRegex = /^\s*\{\s*id:\s*"[^"]+",.*?src:\s*"([^"]+)",.*?w:\s*\d+,\s*h:\s*\d+,\s*album:.*?\s*\}/gm;

let newContent = content.replace(photoItemRegex, (match, srcPath) => {
    try {
        const isVideo = srcPath.toLowerCase().endsWith('.mov') || srcPath.toLowerCase().endsWith('.mp4');
        
        const absoluteSrcPath = path.join(__dirname, 'public', decodeURIComponent(srcPath));
        if (!fs.existsSync(absoluteSrcPath)) {
            console.log(`[Skip] File not found: ${absoluteSrcPath}`);
            return match;
        }

        let trueW = 1600;
        let trueH = 900;

        if (!isVideo) {
            try {
                const sipsOut = execSync(`sips -g pixelWidth -g pixelHeight "${absoluteSrcPath}"`, { encoding: 'utf8' });
                const wMatch = sipsOut.match(/pixelWidth:\s*(\d+)/);
                const hMatch = sipsOut.match(/pixelHeight:\s*(\d+)/);
                if (wMatch && hMatch) {
                    trueW = parseInt(wMatch[1], 10);
                    trueH = parseInt(hMatch[1], 10);
                }
            } catch (err) {
                console.log(`[Warning] Could not get dimensions for ${srcPath}`);
            }
        }

        let thumbSrc = srcPath; 
        
        if (!isVideo) {
            const parsed = path.parse(absoluteSrcPath);
            const thumbDir = path.join(parsed.dir, 'thumbnails');
            if (!fs.existsSync(thumbDir)) {
                fs.mkdirSync(thumbDir, { recursive: true });
            }

            const thumbFilename = `${parsed.name}.jpg`;
            const absoluteThumbPath = path.join(thumbDir, thumbFilename);
            
            const parsedSrc = path.parse(srcPath);
            thumbSrc = srcPath.replace(parsedSrc.base, `thumbnails/${thumbFilename}`);

            if (!fs.existsSync(absoluteThumbPath)) {
                console.log(`Generating thumbnail: ${thumbFilename}`);
                try {
                    execSync(`sips -Z 800 -s format jpeg "${absoluteSrcPath}" --out "${absoluteThumbPath}"`);
                } catch (e) {
                    console.log(`[Warning] sips failed to generate thumbnail for ${srcPath}`);
                    thumbSrc = srcPath; 
                }
            }
        }

        let updated = match;
        if (!updated.includes('thumbSrc:')) {
            updated = updated.replace(/(src:\s*"[^"]+",)/, `$1 thumbSrc: "${thumbSrc}",`);
        }
        
        updated = updated.replace(/w:\s*\d+,\s*h:\s*\d+/, `w: ${trueW}, h: ${trueH}`);
        
        return updated;
    } catch (err) {
        console.log(`Error processing ${srcPath}`, err);
        return match;
    }
});

fs.writeFileSync(galleryFile, newContent, 'utf8');
console.log('Thumbnail generation and galleryData.js update complete!');
