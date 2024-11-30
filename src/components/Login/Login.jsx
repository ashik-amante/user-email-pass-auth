import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import auth from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loginError, setloginError] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const emailref = useRef(null)

    const handleSubmit = e => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        console.log(email, password);
        setloginError('')
        setLoginSuccess('')

        // validate
        if (password.length < 8) {
            setloginError('Password Must be 8 or more character')
            return
        }
        else if (!/[A-Z]/.test(password)) {
            setloginError('Must have an uppercase letter')
            return
        }


        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if(result.user.emailVerified){
                    setLoginSuccess('Log In Success!!')
                }
                else{
                    alert('Please Verify email first')
                }
                

            })
            .catch(error => {
                console.log(error.message);
                console.error(error);
                setloginError('Invalid username or pass ')

            })
    }

    const handleForgetPassword =()  => {
        const email = emailref.current.value;
        if(!email){
            setloginError('Please Provide a email address!')
            return
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            setloginError('Please write a valid email')
            return
        }
        // email validation Email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert('password reset email send ');
        })
        .catch(error=>{
            console.log(error);
        })

    }
    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email"
                                name='email'
                                placeholder="email"
                                ref={emailref}
                                className="input input-bordered"
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password"
                                name='password'

                                placeholder="password"
                                className="input input-bordered"
                                required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    {
                        loginError && <p className='text-red-500'>{loginError}</p>
                    }
                    {
                        loginSuccess && <p className='text-green-500'>{loginSuccess}</p>
                    }
                    <p className='mt-6'>New to this Website !! <Link to='/register'><button className='bg-green-500 text-white px-3 py-2 rounded-lg'>Please Register</button></Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;