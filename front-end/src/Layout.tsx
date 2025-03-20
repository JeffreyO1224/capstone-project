import NavBar from './NavBar.tsx';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}