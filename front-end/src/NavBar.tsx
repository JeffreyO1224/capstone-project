import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                   <Link to='/'>Home</Link>
                </li>
                    
                <li>
                    <Link to='/login'>Log In</Link>
                </li>
                    
            </ul>
        </nav>
    )
}