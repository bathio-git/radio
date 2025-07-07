import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import LoadingAnimation from '@/Components/Animations/LoadingAnimation';
import { _data } from "../Context/Context"

export default function VerifyPage() {

    const [message, setMessage] = useState('Verifying your account...');
    const [loading, setLoading] = useState(true);

    const {setCurrentUser} = useContext(_data);

    useEffect(() => {
        // Extract the token from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        //console.log(token)

        // If no token, update the message and exit
        if (!token) {
            setMessage('Invalid verification link.');
            setLoading(false);
            return;
        }

        // Send a request to the server with the token
        fetch('/api/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        })
            .then(response => response.json())
            .then(data => {
                // Update the message based on the server's response
                if (data.message === 'User verified successfully') {
                    setMessage(`Your account has been verified... Welcome ${data.username}! `);
                } else {
                    console.log(data.message)
                    setMessage(data.message || 'There was a problem verifying your account.');
                }
                setLoading(false);

                setCurrentUser({
                    'username' : data.username,
                    'email' : data.email,
                })
            })
            .catch(() => {
                setMessage('There was an error verifying your account. Please try again later.');
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>{loading ? <>
                'Verifying...' 
                <LoadingAnimation />
            </> : ''}</h1>
        <p>{message}</p>
        {!loading && (
            <p>
            <Link href="/">
                Go to Homepage
            </Link>
            </p>
        )}
        </div>
    );
}
