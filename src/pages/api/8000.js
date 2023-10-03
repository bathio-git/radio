import { request as httpsRequest } from 'https';

export default async function x(req, res) {

    console.log('Received request:', req.method, req.url);

    const streamUrl = req.query.url;

    const streamReq = httpsRequest(streamUrl, (streamRes) => {
        res.writeHead(streamRes.statusCode, streamRes.headers);
        streamRes.pipe(res);
    });

    streamReq.on('error', (error) => {
        console.error('Error in request to stream:', error);
        res.status(500).json({ error: 'Failed to fetch stream' });
    });

    streamReq.setHeader('User-Agent', req.headers['user-agent']);

    if (req.method === 'GET') {
        streamReq.end();
    } else {
        console.log('Handling unsupported request method:', req.method);
        res.setHeader('Allow', 'GET');
        res.status(405).end();
    }

    // Return a promise to tell Next.js that we're done
    return new Promise((resolve) => {
        streamReq.on('close', resolve);
    });
}