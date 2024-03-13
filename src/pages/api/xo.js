import https from 'https';
import { spawn } from 'child_process';

export default async function handler(req, res) {
  const inputUrl = 'https://n10as.out.airtime.pro/n10as_a'; // Replace with your input URL

  https.get(inputUrl, (stream) => {
    console.log(`Response status code: ${stream.statusCode}`);
    console.log(`Response headers: ${JSON.stringify(stream.headers)}`);

    const ffmpeg = spawn('lame', );

    stream.pipe(ffmpeg.stdin);

    res.setHeader('Content-Type', 'audio/aac');
    res.setHeader('Transfer-Encoding', 'chunked');

    const chunkSize = 1024 * 1024 * 2; // 2MB
    let totalBytesSent = 0;

    ffmpeg.stdout.on('data', (chunk) => {
      totalBytesSent += chunk.length;
      res.write(chunk);

      if (totalBytesSent >= chunkSize) {
        ffmpeg.stdout.pause();
        totalBytesSent = 0;
        setTimeout(() => {
          ffmpeg.stdout.resume();
        }, 1000);
      }
    });

    ffmpeg.stdout.on('end', () => {
      res.end();
    });
  });

  // Return a promise to tell Next.js that we're done
  return new Promise((resolve) => {
    res.on('close', resolve);
    res.on('finish', resolve);
  });
}