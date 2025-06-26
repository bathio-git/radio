export default function yay(json, setUserRecords, setAllRecords) {
    
    const message = document.getElementById('message');

    if (json?.x?.message === "New mix created successfully" || json === 0) {
        message.style.display = 'block'
        message.textContent = 'Recording saved in your profile';
        setAllRecords(null)
        setUserRecords(null)
    } else {
        message.textContent = 'Something went wrong';
    }

    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
}