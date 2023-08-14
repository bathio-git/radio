import { border } from "@mui/system"

const imageModalStyles = {
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0)',
        filter: 'blur(0.5px)',
        width: '95vw',
        height: '95vh',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        color: '#aaa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'none',
        zIndex: '100',
    },
}

export { imageModalStyles }