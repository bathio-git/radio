import axios from 'axios';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function XSign({ mixId, onDelete }) {

  const deleteMix = async () => {
    try {
      const response = await axios.post('/api/deleteMix', { mixId });
      if (response.status === 200) {
        onDelete()
      } else {
        console.error(`Failed to delete mix: ${response.data.error}`);
      }
    } catch (error) {
      console.error(`Failed to delete mix: ${error}`);
    }
  }

  return (
    <div 
      onClick={deleteMix}
      className="cursor-pointer mx-12 my-2 "
    
    >
      <DeleteForeverOutlinedIcon />
    </div>
  );
}