import Icon from './Icon';
import ImageModale from './ImageModale';
import { addImage } from '@/lib/addImage';
import { useEffect, useState } from 'react';

export default function Image({ metadata, classe, edits}) {

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
                    <ImageModale image={uploadedImage} classe={classe} edits={edits} />
                ) : (
                    <Icon edits={edits}/>
                )
            }
        </div>
    );
}