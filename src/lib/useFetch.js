import { useContext } from "react";
import { _data } from "@/Context/Context";

export default function useFetch({ setRecords, user }) {
    
    const {
        fetchRecords,
        previousFetchRecords,setPreviousFetchRecords,
        userRecords, setUserRecords,
        allRecords, setAllRecords
    } = useContext(_data);

    return async function efficientFetch() {

        if (user) {
        // Only fetch if userRecords is null or not for this user
            if (!userRecords || userRecords[0]?.username !== user.username || previousFetchRecords < fetchRecords ) {
                
                fetch(`/api/getMixesOfUser?user=${user.username}`)
                    .then(res => res.json())
                    .then(data => {
                        setRecords(data.reverse());
                        setUserRecords(data);
                        setPreviousFetchRecords(fetchRecords);
                    })
                    .catch(err => console.error('Error fetching user mixes:', err));
            } else {
                setRecords(userRecords);
            }    
        } else {
            // Only fetch if allRecords is null or if fetch records changed
            if (!allRecords || previousFetchRecords < fetchRecords ){
                fetch(`/api/getAllMixes`)
                    .then(res => res.json())
                    .then(data => {
                        setRecords(data.reverse());
                        setAllRecords(data);
                        setPreviousFetchRecords(fetchRecords)
                    })
                    .catch(err => console.error('Error fetching all mixes:', err));
            } else {
                setRecords(allRecords);
            }
        }
    }
}