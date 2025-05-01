import yippeeCat from '../../assets/yippee.gif';
import { Link } from 'react-router-dom';

export default function LoginPage({ setIsLoggedIn }) {
    return (
        <>
            <h1>This is the Login Page!!</h1>
            <img src={yippeeCat} alt="Cat Jumping and Clapping"/>
            <Link to = "/signup">
            <p>Sign up here!</p>
            </Link>
        </>
    )
}