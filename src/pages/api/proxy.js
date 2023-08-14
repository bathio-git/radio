// How to proxy a Shoutcast stream with Next.js

import { request as httpsRequest } from 'https';

export default async function proxy(req, res) {

    const streamUrl = 'https://n10as.out.airtime.pro/n10as_a'

    const streamReq = httpsRequest(streamUrl, (streamRes) => {
        res.writeHead(streamRes.statusCode, streamRes.headers);
        streamRes.pipe(res);
    });

    streamReq.on('error', (error) => {
        console.error('Error in request to stream:', error);
        res.status(500).json({ error: 'Failed to fetch stream' });
    });

    streamReq.setHeader('User-Agent', req.headers['user-agent']);

    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Headers', '*');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === 'GET') {
        streamReq.end();
    } else {
        res.setHeader('Allow', 'GET');
        res.status(405).end();
    }
}
