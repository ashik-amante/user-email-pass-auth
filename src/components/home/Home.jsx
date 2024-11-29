import React from 'react';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Heroregister from '../Heroregister/Heroregister';

const Home = () => {
    return (
        <div>
            <Login></Login>
           <Register></Register>
           <Heroregister></Heroregister>
        </div>
    );
};

export default Home;