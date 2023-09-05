import validMail from "./validMail"

export default function submitNewUser( event, userName, password, cPassword, email, setCurrentUser, setRadioList ){

    event.preventDefault()
    const validEmail = validMail(email)

    const i = document.getElementById('messageC')

    console.log('submitting new user')
    if(validEmail === false){

        i.style.display= 'block'
        i.innerText='» please enter a valid email';
        return;
    }
    else if ( password !== cPassword && password !== null){

        i.style.display= 'block'
        i.innerText= "» passwords don't match"
        return;
    }
    else if (userName === null || password === null || email === null){

        i.style.display= 'block'
        i.innerText= "» please fill all the fields"
        return;
    }
    else {
        const userInfo = {
            'username': userName,
            'password': password,
            'email': email,
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user: userInfo }),
        }
    
        fetch("api/newUser", requestOptions)
            .then((response) => response.json()) // Extract JSON data from the response
            .then((data) => { // Now you can access the data
                console.log(data.message);

                if (data.message) {
                    console.log("okoko")
                    i.innerText = data.message;
                    i.style.display = 'block';
                }
            })
            .catch((error) => console.error('Error:', error));
    }
}