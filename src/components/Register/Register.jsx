import React from 'react';

const Register = () => {
    const handleSubmit = e =>{
        e.preventDefault()
        console.log(e.target.email.value);
        console.log(e.target.password.value);
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