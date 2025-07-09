export default function submitLogin ({userName, password, setCurrentUser, event}) {

    event.preventDefault()

    let userInfo = {
        'username' : userName,
        "password" : password,
    }
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: userInfo })
    }

    fetch("/api/login", requestOptions)
    .then((res) => res.json())  
    .then((data) => { 
        if ( data.message === 'Login successful' ){
            console.log(data)
            let i = document.getElementById('messageL')
            let x = {
                'username' : data.username,
                'email' : data.email,
            }
            setCurrentUser(x)
            i.innerText= 'welcome ' + data.username
            i.style.display= 'block'
            clear()
        }
        else if( data.message === 'User not found' ){
            let i = document.getElementById('messageL')
            i.innerText= ' /: unknown user'
            i.style.display= 'block'    
        }
        else if( data.message === 'Invalid password' ){
            let i = document.getElementById('messageL')
            i.innerText= ' /: invalid password'
            i.style.display= 'block'    
        }
        else{
            let i = document.getElementById('messageL')
            i.innerText= ' /: something went wrong'
            i.style.display= 'block'    
        }
    })  
    .catch( (e) => { console.log(e)}) 
}

function clear (){
    let i = document.getElementById('messageL')
    setTimeout(() => {
        i.style.display= 'none'
        console.log('clearing message')
    }
    , 5000)
}