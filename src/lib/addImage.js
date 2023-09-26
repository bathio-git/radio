export async function addImage({event, metadata, setUploadedImage}) {

    const selectedImage = event.target.files[0];

    if (!selectedImage) { 
        console.log('no image selected')
        return
    }

    // convert image to base64 string
    const reader = new FileReader()
    reader.readAsDataURL(selectedImage)
    reader.onloadend = () => {
        const data = {
            image: reader.result,
            metadata: metadata,
        }
        sendToDb( data, setUploadedImage )
    }
}


async function sendToDb( data, setUploadedImage ) {

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
        setUploadedImage(data.image)

    } else {
        console.log('Image upload failed')
        return null
    }
}