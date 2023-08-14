import { useEffect, useState } from 'react';
/* import addImage from '../../lib/addImage'; */
import ImageModale from './ImageModale';

export default function Image({ metadata, classe }) {

    const [uploadedImage, setUploadedImage] = useState();

    useEffect(() => {
        
        const encodedMetadata = JSON.stringify(metadata); 
        fetch(`/api/getImage?metadata=${encodedMetadata}`)
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    setUploadedImage(data[0].image);
                }
            })
    }, [metadata])

    async function addImage(event, selectedImage) {

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
            setUploadedImage(data.image)
        } else {
            console.log('Image upload failed')
        }
    }
    
    function fileChangeHandler (event) {
        const selectedImage = event.target.files[0];
        addImage(event, selectedImage)
    }

    return (
        <div>
            <input 
                type="file" 
                id="fileUpload" 
                accept="image/*" 
                onChange={fileChangeHandler} 
                className="hidden" // hide the default file input
            />
            {
                uploadedImage ? (
                    <ImageModale image={uploadedImage} metadata={metadata} classe={classe} />
                ) : (
                    <button 
                        onClick={(event) => {
                            event.stopPropagation()
                            document.getElementById("fileUpload").click(); 
                        }} // trigger the hidden file input onClick
                        className='mr-[1ch]'
                    >
                        <Icon />
                    </button>
            )}
        </div>
    );
}


function Icon (){

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-image" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
        </svg>
    )
}