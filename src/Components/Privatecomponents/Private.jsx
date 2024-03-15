import React, { useState } from 'react';
// import { useEffect } from 'react';
// import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { setauthenticate } from '../../Reducers/authSlice';


const Private = ({page: Account}) => {
    

    // const [authentication, setauthentication] = useState(null)

    const authStatus = useSelector((state)=> state.authenticate.value)

    


    return (
        <>
            {authStatus ? (
                <Account/>
            ) : (
                <Navigate to='/signin' />
            )

            }

        </>
    )
}

export default Private;