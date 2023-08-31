import { useContext } from 'react';
import { _data } from '../../Context/Context';
import FastRewindIcon from '@mui/icons-material/FastRewind';

const Rewind = () => {
  const context = useContext(_data);

  const rewind = () => {
    if (context.buffer.length > 0) {
      const lastChunk = context.buffer[context.buffer.length - 1];
      const blob = new Blob([lastChunk], { 'type' : 'audio/ogg; codecs=opus' });
      const audioURL = window.URL.createObjectURL(blob);
      
      const audio = new Audio(audioURL);
      audio.play();
    }
  };

  return (
    <button onClick={rewind} className='mr-4'>
      <FastRewindIcon />
    </button>
  );
};

export default Rewind;
