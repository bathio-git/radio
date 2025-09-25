// import { request as httpsRequest } from 'https';
// import ffmpeg from 'fluent-ffmpeg';

// export default async function x(req, res) {

//     console.log('Received request:', req.method, req.url);

//     const streamUrl = 'https://n10as.out.airtime.pro/n10as_a'

//     const streamReq = httpsRequest(streamUrl, (streamRes) => {
//         const ffmpegCommand = ffmpeg(streamRes)
//             .format('aac')
//             .audioCodec('aac')
//             .outputOptions('-movflags frag_keyframe+empty_moov')
//             .on('error', (error) => {
//                 console.error('Error in ffmpeg command:', error);
//                 if (!res.headersSent) {
//                     res.status(500).json({ error: 'Failed to convert stream to AAC' });
//                 }
//             })
//             .on('end', () => {
//                 console.log('Finished converting stream to AAC');
//             });

//         if (!res.headersSent) {
//             res.writeHead(200, {
//                 'Content-Type': 'audio/aac',
//                 'Transfer-Encoding': 'chunked',
//                 'Cache-Control': 'no-cache',
//                 'Connection': 'keep-alive'
//             });
//         }

//         ffmpegCommand.pipe(res);
//     });

//     streamReq.on('error', (error) => {
//         console.error('Error in request to stream:', error);
//         if (!res.headersSent) {
//             res.status(500).json({ error: 'Failed to fetch stream' });
//         }
//     });

//     streamReq.setHeader('User-Agent', req.headers['user-agent']);

//     if (req.method === 'GET') {
//         streamReq.end();
//     } else {
//         console.log('Handling unsupported request method:', req.method);
//         if (!res.headersSent) {
//             res.setHeader('Allow', 'GET');
//             res.status(405).end();
//         }
//     }

//     // Return a promise to tell Next.js that we're done
//     return new Promise((resolve) => {
//         streamReq.on('close', resolve);
//     });
// }