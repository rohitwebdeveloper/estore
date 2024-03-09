import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const Private = ({page: Account}) => {

    const [authentication, setauthentication] = useState(null)

    const userid = localStorage.getItem('userid')

    useEffect(() => {
        ; (async () => {

            try {
                const response = await axios.post('http://localhost:8000/authuser', userid)
                console.log(response.data);
                if (response.data.success === true) {
                    setauthentication(true)
                } else if (response.data.success === false) {
                    setauthentication(false)
                }
            } catch (error) {
                console.log(error)
            }

        })()

    }, [])

    return (
        <>
            {authentication ? (
                <Account/>
            ) : (
                <Navigate to='/signin' />
            )

            }

        </>
    )
}

export default Private;