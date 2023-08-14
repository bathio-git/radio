export default async function addImage(event, metadata, selectedImage, setUploadedImage) {

    event && event.preventDefault()

    if (!selectedImage) { 
        console.log('no image selected')
        return
    }

    // convert image to base64 string
    const reader = new FileReader()
    reader.readAsDataURL(selectedImage)
    reader.onloadend = () => {
        console.log('reader.onloadend')
        const data = {
            image: reader.result,
            metadata: metadata,
        }
        sendToDb( data )
    }
}

async function sendToDb( data ) {

    console.log('sendToDb')
    const response = await fetch('/api/newImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (response.ok) {
        const data = await response.json()
        console.log('Image upload successful', data)

    } else {
        console.log('Image upload failed')
        return null
    }
}