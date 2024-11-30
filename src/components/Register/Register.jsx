import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase.config';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [logerror, setLogerror] = useState('')
    const [logsuccess, setLogsuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)



    const handleSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value

        // reset
        setLogerror('')
        setLogsuccess('')

        // validate pass
        if (password.length < 6) {
            setLogerror('Pasword must be 6 charecter or long')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setLogerror('tour pass should have at least one uppercase letter')
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user
                console.log(user);
                setLogsuccess('User logged successfully !')
            })
            .catch(error => {
                console.log('error', error);
                setLogerror(error.message)
            })
    }
    return (
        <div>
            <h2 className='text-4xl  mt-12'> Please Register  </h2>

            <form onSubmit={handleSubmit} className='flex justify-between mt-10 '>

                <div className='space-y-4 mx-auto  w-full'>
                    <input className='px-2 py-3 w-1/3 rounded-lg' type="email" name="email" placeholder='Email' id="" required /><br />

                    <div className='flex justify-center items-center relative'>
                        <input
                            className='px-2 py-3 w-1/3 rounded-lg '
                            type={showPassword ? 'text' : 'password'}
                            name="password" id="" placeholder='Password' required /> <br />
                        <p className=' text-2xl absolute md:ml-80' onClick={() => setShowPassword(!showPassword)}>
                            {
                                showPassword ? <FaRegEye /> : <FaEyeSlash />
                            }
                        </p>
                    </div>
                    <br />

                    <input className='px-2 py-3 w-1/3 rounded-lg btn btn-success' type="submit" value="Submit" />
                </div>
            </form>
            {
                logerror && <p className='text-2xl text-red-600'>{logerror}</p>
            }
            {
                logsuccess && <p className='text-2xl text-green-600'>{logsuccess}</p>
            }
        </div>
    );
};

export default Register;