
export default function UserX ({setRadioList}) {


    return (
        <div className="text-[1rem]">
            <p>Photo de l'user</p>
            <p>Username</p>
            <p>email</p>
            <Recordings user={currentUser} edits={true} />
        </div>
    )
}


/* 

    user recieve  userID  
    then fetch user data from db
    then fetch image from db
    then fetch user recordings from db

    if user is currentUser
        then show edit button

    if user is not currentUser
        then show follow button

*/