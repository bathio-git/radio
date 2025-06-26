import axios from "axios";

export default async function onDelete(
    recordId,
    records,
    setRecords,
    setFetchRecords,
    setUserRecords,
    setAllRecords
) {
    // Optimistically update UI
    const updatedRecords = records.filter(record => record._id !== recordId);
    setRecords(updatedRecords);

    const mixId = recordId;

    // Helper to filter out the deleted record
    const filterOut = arr => arr ? arr.filter(record => record._id !== recordId) : arr;

    try {
        const response = await axios.post('/api/deleteMix', { mixId });
        if (response.status === 200) {
            setFetchRecords(prev => prev + 1);
            setUserRecords(filterOut);
            setAllRecords(filterOut);
        } else {
            console.error(`Failed to delete mix: ${response.data.error}`);
            setRecords(records); // revert UI if deletion failed
            alert('Failed to delete record');
        }
    } catch (error) {
        console.error(`Failed to delete mix: ${error}`);
        setRecords(records);
        alert('Failed to delete record');
    }
}