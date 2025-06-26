import axios from 'axios';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function XSign({ mixId, onDelete }) {
  
  return (
    <span 
      onClick={onDelete}
      className="cursor-pointer mx-16 "
    >
      <DeleteForeverOutlinedIcon />
    </span>
  );
}
