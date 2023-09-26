const modalConnect = {
    overlay: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        position: 'absolute',
        top: '0',
        left: '0',
        backgroundColor: 'rgba(0, 0, 0)',
        filter: 'blur(0.5px)',
        width: '100vw',
        height: '100vh',
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

export { modalConnect }