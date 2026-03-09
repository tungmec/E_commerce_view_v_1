import  { Nav } from '../Component/NAV/Nav';
import {Outlet} from 'react-router-dom';

export const RootLayout = () => {
    return (
        <>
            <Nav />
            <main>
                <Outlet />
            </main>
        </>
    )
};