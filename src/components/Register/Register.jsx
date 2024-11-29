import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import auth from '../../firebase/firebase.config';

const Register = () => {
    const handleSubmit = e =>{
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        createUserWithEmailAndPassword(auth,email,password)
        .then(userCredential=>{
            const user = userCredential.user
        })
        .catch(error=>{
            console.log('error',error);
        })
    }
    return (
        <div>
            <h2 className='text-4xl  mt-12'> Please Register  </h2>

            <form onSubmit={handleSubmit} className='space-y-4 mt-10'>

                <input className='px-2 py-3 w-1/3 rounded-lg' type="email" name="email" placeholder='Email' id="" /><br />
                <input className='px-2 py-3 w-1/3 rounded-lg' type="password" name="password" id="" placeholder='Password' /><br />
                <input className='px-2 py-3 w-1/3 rounded-lg btn btn-success' type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Register;