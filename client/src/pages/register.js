import {useState} from "react";
import {AuthForm} from "../components/common/authForm";
import * as Services from "../services/services";
import {MuiSnackbar} from "../components/common/MuiSnackbar";

export const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('');
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({})


    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await Services.registerUser({username, password, email})
        if(response.error) {
           setData({
                   message:'Registration Failed!',
                   severity: 'error'
               }
           )
        }else {
            setData({
                    message: response.message || 'Registration Successful!',
                    severity: 'success'
                }
            )
        }
        setOpen(true)
        setUsername('');
        setPassword('')
        setEmail('')
        setPhoneNumber('')
    }
    return (
        <>
            <AuthForm
                username={username} password={password}
                setUsername={setUsername} setPassword={setPassword}
                email={email} setEmail={setEmail} label={'Register'}
                phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
                handleSubmit={handleSubmit}
            />
            {open && (
                <MuiSnackbar severity={data.severity} message={data.message} setOpen={setOpen} open={true}/>
            )}
        </>
    )
}
