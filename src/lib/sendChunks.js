export default async function sendChunks(base64Chunks, restOfData) {
    if (base64Chunks.length === 0) {
      // All chunks have been sent, send the rest of the data
      try {
        const res = await fetch('/api/newMix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(restOfData),
        });
  
        const json = await res.json();
        // Handle the response as needed
      } catch (error) {
        // Handle errors
      }
    } else {
      const chunk = base64Chunks.shift();
      const data = { ...restOfData, base64: chunk };
  
      try {
        const res = await fetch('/api/newMix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        const json = await res.json();
        // Handle the response as needed
  
        // Continue sending the remaining chunks
        sendChunks(base64Chunks, restOfData);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }