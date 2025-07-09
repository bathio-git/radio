import Icon from './Icon';
import ImageModale from './ImageModale';
import { addImage } from '@/lib/addImage';
import { useEffect, useState, useContext } from 'react';
import { _data } from '@/Context/Context.js';

export default function Image({ metadata, classe, edits, blur, big}) {

    const { 
        uploadedImage, setUploadedImage,
        previousMetadata, setPreviousMetadata
     } = useContext(_data);
  
    useEffect(() => {
        
        const encodedMetadata = JSON.stringify(metadata); 

        if (encodedMetadata !== JSON.stringify(previousMetadata)) {

            setPreviousMetadata(metadata);
            fetch(`/api/getImage?metadata=${encodedMetadata}`)
            .then(res => res.json())
            .then(data => {
                if (data[0]) {
                    setUploadedImage(data[0].image);
                }
            })
            .catch(err => console.error('Error fetching image:', err));
        }
    }, [])

    return (
        <div>
            <input 
                type="file" 
                id="fileUpload" 
                accept="image/*" 
                className="hidden" 
                onChange={
                    event=>{
                        const data = addImage({ event, metadata, setUploadedImage})
                        setUploadedImage(data.image)
                    }
                }
            />
            {
                uploadedImage ? (
                    <ImageModale image={uploadedImage} classe={classe} edits={edits} blur={blur} big={big}/>
                ) : (
                    <Icon edits={edits}/>
                )
            }
        </div>
    );
}