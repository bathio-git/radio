export default async function postMan(address, data) {
    
    const res = await fetch(address, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const json = await res.json(); console.log('Response from server', json)
    return json;
}