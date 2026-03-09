import { NavLink } from 'react-router-dom';

export const Nav = () => {
    return (
        <>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/Products'>Products</NavLink>
        </>
    )
}