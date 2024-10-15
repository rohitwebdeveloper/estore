import React, {useState, useEffect} from 'react';
import './Reset.css'
import apiurl from '../../../api/apiConfig';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const ResetPassword = ()=>{

    const [newpassword, setnewpassword] = useState();
    const [confirmpassword, setconfirmpassword] = useState();
    const [errormessage, seterrormessage] = useState();
    const navigate = useNavigate()
    const emailverified = useSelector((state)=> state.verifiedemail.value)


    useEffect(() => {
      
    // const verifiedStatus = useSelector((state)=>state.verifiedemail.value)
    if (emailverified==null) {
        navigate('/signin')
        return
    }
     
    }, [])
    

    const newpasswordChange = (event)=>{
        setnewpassword(event.target.value)

    }

    const confirmpasswordChange = (event) =>{
        setconfirmpassword(event.target.value)
    }
 
    // Defining action to be performed when user click on reset password button
    const resetClick = async ()=>{
        // Checking the password entered in input field is empty and inncorrect or not
        if ((newpassword==null || confirmpassword==null) || (newpassword=='' ||  confirmpassword=='') ) {
            seterrormessage('Please enter passsword')
            return;
        }
        if (newpassword.length<8 || confirmpassword.length<8) {
            seterrormessage('Password must be atleast 8 characters')
            return;
        }
        if(confirmpassword!==newpassword){
            seterrormessage("Both password do not match")
            return;
        }
        console.log(emailverified)

        try{
            // Making a patch request to the server to update user password from the database
            const response = await axios.patch(`${apiurl}/api/auth/reset-password`, {newpassword, emailverified})
            if(response.data.success===true){
                navigate('/signin');
            }

        } catch (error) {
            seterrormessage(error.response.data.message)
        }

     }
    
    

    return(
        <>
        <div className="resetContainer">
            <div className="errorMessage">{errormessage}</div>
            <div className="resetBox">
                <div className="resetHeading">Reset Password</div>
                <label htmlFor="newpassword">New Password *</label>
                <input type="text" name='newpassword' className='resetinput' value={newpassword} onChange={newpasswordChange} />
                <label htmlFor="confirmpassword">Confirm Password * </label>
                <input type="text" name='confirmpassword' className='resetinput' value={confirmpassword} onChange={confirmpasswordChange} />
                <button className='resetBtn' onClick={resetClick} >Reset Password</button>
            </div>
        </div>
        </>
    )

}

export default ResetPassword;