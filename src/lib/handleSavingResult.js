export default function handleSavingResult(
    json, setUserRecords, setAllRecords, setResult, setIsSaving
) {
    
    if (json?.x?.message === "New mix created successfully" || json === 0) {
        setResult( 'Recording saved in your profile' )
        setAllRecords(null)
        setUserRecords(null)
    } else {
        setResult('Something went wrong')
    }
    setIsSaving(false)
}