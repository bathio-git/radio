import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';
import { _data } from '@/Context/Context';


export default function RedButton({ setIsRecording, isRecording }){
    
    const RedRadioButton = styled(RadioButtonCheckedOutlinedIcon)` color: ${isRecording ? '#aa0000' : '#aaa' };`;
    const { currentUser, setMenu } = useContext(_data);

    return(
        <button 
            className='mr-4 flex items-center zAudioPlayer '
            onClick={() => { 
                if (currentUser === null){
                    setMenu(false);
                    document.getElementById('message').style.display = 'block';
                    document.getElementById('message').innerHTML = 'You must be logged in to record';
                    setTimeout(() => {document.getElementById('message').style.display = 'none'}
                        , 5000)
                    return;
                }
                setIsRecording(!isRecording)
            }}
        >
            <RedRadioButton />
        </button>
    )
}