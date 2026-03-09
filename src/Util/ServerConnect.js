
const API_URL = "http://localhost:3000";

// Create new user:
export const createUser = async (userName, password) => {
    try {
        const response = await fetch(`${API_URL}/users/create`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: userName,
                password: password,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.message);
            return false;
        } else {
            const data = await response.json();
            alert(`User ID: ${data.id} create at: ${data.create_at}`);
            return true;
        }

    } catch(err){
        alert(err.message);
        return false
    };

};

// User Login function:
export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            alert(data.message);
            return false;
        } else {
            const data = await response.json();
            alert(data.message);
            return true;
        }
    } catch(err) {
        alert(err.message);
        return false;
    };

};