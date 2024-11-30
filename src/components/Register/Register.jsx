import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/firebase.config';
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
    const [logerror, setLogerror] = useState('')
    const [logsuccess, setLogsuccess] = useState('')
    const [showPassword, setShowPassword] = useState(false)



    const handleSubmit = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const password = e.target.password.value
        const accepted = e.target.terms.checked
        console.log(email,password,accepted);

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
        else if(!accepted){
            setLogerror('please accept our terms and co')
            return
        }

       
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user
                console.log(user);
                setLogsuccess('User Created Successfully!!')
                // update profile
                updateProfile(user, {
                    displayName: name,
                    photoURL:"https://example.com/jane-q-user/profile.jpg"
                })
                .then(()=>console.log('Profile Updated!'))

                // email verification 
                sendEmailVerification(user)
                .then(()=>{
                    alert('Please Vaerify your email')
                })
                // setLogsuccess('User Register successfully !')
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
                    <input className='px-2 py-3 w-1/3 rounded-lg' type="text" name="name" placeholder='Your Name' id="" required /><br />

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
                    <input type="checkbox" name="terms" id="terms" />
                    <label className='ml-2' htmlFor="terms">Accept out terms and condition </label>
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
            <p className='mt-6'>Already Have an account  !! <Link to='/login'><button className='bg-green-500 text-white px-3 py-2 rounded-lg ml-2'>Please Log In</button></Link> </p>
        </div>
        
    );
};

export default Register;