import { useNavigate } from 'react-router-dom';
import {useState} from 'react';
import styles from './Home.module.css';
import {CreateUserForm} from './CreateUserForm';
import {LoginForm} from './LoginForm';
import { getAuth } from '../../AuthProvider.jsx';
import { UserProfileForm } from './UserProfileForm.jsx';

export const Home = () => {

    const navigate = useNavigate();
    const { authLoading, authenticated, user ,checkAuth} = getAuth();

   

    // Render part:
    if (authLoading) {
        return (
            <h2>Loading ........</h2>
        )
    } else {
        if (!authenticated) {
            return (
                    <div className={styles.home_body}>
                        <div className={styles.container}>
                            <CreateUserForm />
                            <h2>Or</h2>
                            <LoginForm />
                        </div>
                        
                    </div>
                )
        } else {
            return (
                <div>
                    <UserProfileForm />
                </div>
            )
        }
    }
   
}