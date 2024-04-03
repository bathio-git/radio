import mongoClient from "@/lib/mongoClient";
import { ObjectId } from "mongodb";

export default async function stream(req, res) {
  
  const mixId = req.query.id;
  const client = mongoClient();

  try {
    await client.connect();
    const db = client.db("databaseName");
    const collection = db.collection("mixesBase64");

    const mix = await collection.findOne({ _id: new ObjectId(mixId) });

    
    if (!mix) {
      res.status(404).json({ error: 'Mix not found' });
      return;
    }
    //console.log(mix)

    let base64Data = mix.base64;
    //console.log('this page should let you stream', base64Data.substring(0, 100));
    const base64Prefix = "data:audio/ogg; codecs=opus;base64,";
    if (base64Data.startsWith(base64Prefix)) {
      base64Data = base64Data.substring(base64Prefix.length);
    }

    const audioBuffer = Buffer.from(base64Data, 'base64');
    const fileSize = audioBuffer.length;
    const { range } = req.headers;

    const MAX_CHUNK_SIZE = 3145728; // 3MB in bytes

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      let end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      // Ensure the chunk size doesn't exceed the maximum size
      if (end - start + 1 > MAX_CHUNK_SIZE) {
        end = start + MAX_CHUNK_SIZE - 1;
      }

      if (start >= fileSize) {
        res.status(416).send("Requested range not satisfiable");
        return;
      }

      const chunkSize = end - start + 1;
      const chunk = audioBuffer.slice(start, end + 1);

      res.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Content-Length', chunkSize);
      res.setHeader('Content-Type', 'audio/ogg; codecs=opus');
      res.status(206).send(chunk);
    } else {
      res.setHeader('Content-Length', fileSize);
      res.setHeader('Content-Type', 'audio/ogg; codecs=opus');
      res.status(200).send(audioBuffer);
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  } finally {
    await client.close();
  }
}