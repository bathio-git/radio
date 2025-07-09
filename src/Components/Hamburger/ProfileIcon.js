import UserProfile from "../UserProfile"
import Connect from "../Connect"


export default function ProfileIcon({currentUser, setRadioList}){

    return (
    <>
        { 
            currentUser && Object.keys(currentUser).length > 0 
            ? <UserProfile edits={true} />
            : <Connect setRadioList={setRadioList} />
        }
    </>)
}

