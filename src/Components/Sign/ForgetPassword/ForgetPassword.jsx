import React, {useState} from "react";
import './Forget.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setverifiedemail } from "../../../Reducers/emailSlice";

const ForgetPassword = () => {

    const [editable, seteditable] = useState(true);
    const [ opacity, setopacity] = useState({opacity:'0.3'})
    const [emaileditable, setemaileditable]= useState(false);
    const [useremail, setuseremail] = useState('')
    const [servercode, setservercode] = useState();
    const [usercode, setusercode] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const emailonchange = (event)=>{
       setuseremail(event.target.value)
    }

    const codeonchange = (event)=>{
       setusercode(event.target.value)
    }

// Defining action for Send button click
    const sendClick = async ()=>{
       
        try {
            // Making a post request to the server to check whether this account exists or not
            const response = await axios.post('http://localhost:8000/password/forget', {useremail})
    
            if(response.data.success===true){
                seteditable(false)
                setemaileditable(true)
                setopacity({opacity: '1'})
                setservercode(response.data.verificationCode)

                console.log('Verification Code:', response.data.verificationCode);
            }else{
                seteditable(true)
                setopacity({opacity: '0.3'})
            }
            
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    // Defining action to verify code entered by the user
    const verifyClick = ()=>{
         if (usercode == servercode) {
            dispatch(setverifiedemail(useremail))
            navigate('/account/password/reset')
         }else{
            alert("Invalid verification code")
         }
    }

    return (
        <>
            <div className="forgetContainer">
                <div className="forgetBox">
                    <div className="emailDescription">
                        To ensure the security of your account and to complete the verification process, please enter the email address that you used to create your account below. We'll send a verification email to this address to confirm your identity.
                    </div>
                    <div className="emailBox">
                        <input type="email" className="userEmail" readOnly={emaileditable} placeholder="Enter email" value={useremail} onChange={emailonchange} />
                        <button className="sendBtn" onClick={sendClick} disabled={emaileditable} >Send</button>
                    </div>
                    <div className="verificationBox">
                        <div className="responseBox" style={opacity} >We have sent a mail to your email-id. Please enter the verification code below</div>
                        <div className="codeBox">
                            <input type="number" className="verifyCode" readOnly={editable} value={usercode} onChange={codeonchange} />
                            <button className="sendBtn" onClick={verifyClick} >Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword;