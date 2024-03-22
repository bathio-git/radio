import axios from 'axios';
import EditNoteIcon from '@mui/icons-material/EditNote';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function EditNote({ edit, setEdit, id, title}) {

    async function modifyNote() {
        console.log(id)
        try {
        const response = await axios.post('/api/modifyTitle', { id, title });
        
            if (response.status === 200) {
                setEdit(!edit)
            }
            
        }catch (error) {
        console.error(`Failed ${error}`);
        }
    }

    return edit ?(
        <div className='flex ml-16'>
            <button 
                onClick={ modifyNote }
                className="cursor-pointer mr-4 "
            >
                <CheckIcon />
            </button>
            <button 
                onClick={() => setEdit(!edit)}
                className="cursor-pointer "
            >
                <CloseIcon />
            </button>

        </div>
    
    ):(
        <button 
            onClick={() => setEdit(!edit) }
            className="cursor-pointer ml-16"
        >
            <EditNoteIcon />
        </button>
    );
}
