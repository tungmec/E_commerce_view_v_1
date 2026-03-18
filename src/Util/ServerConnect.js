
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
            credentials: "include" ,
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

// User logout:

export const logoutUser = async () => {
    try {
       const response = await fetch(`${API_URL}/users/logout`, {
            method: 'POST',
            credentials: "include",
        });
        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch(err) {
       
        return false;
    }
};

// Load all categories:

export const readAllCategories = async() => {
    try {
        const response = await fetch(`${API_URL}/products/categories`, {
            method: 'GET',
            credentials:"include",
        });

        if (!response.ok) {            
            alert("Fail to load categories");
            return null;
        };

        const data = await response.json();
        return data.data;


    }  catch(err) {
            alert(err.message);
            return null;
        }
}


// Load products by category name :

export const loadProductsByCategoryName = async (categoryName) => {
    try {
        const response = await fetch(`${API_URL}/products?category=${categoryName}`, {
            method:'GET',
            credentials:"include",
            
        });

        if (!response.ok) {
            const result = await response.json();
            console.log(result);
            return [];
        } else {
            const data = await response.json();
            return data.result;
        }

    } catch(err) {
        console.log(err.message);
        return [];
    }
}

// Load Variants by ProductId:

export const loadVariantsByProductId = async (productId) => {
    try {
            const response = await fetch(`${API_URL}/products/${productId}/variants`,
                {
                    method:'GET',
                    credentials:"include",
            });

            if (!response.ok) {
                const data = await response.json();
                console.log(data.message);
                return [];
            } else {
                const data = await response.json();
                return data.variants;
            }

    } catch(err) {
        console.log(err.message);
        return [];
    }
}

// load all carts from API by User Id:

export const loadAllCartsByUserId = async (userId) => {
    try {
        const response = await fetch(`${API_URL}/cart/all/${userId}`,
            {
                method: 'GET',
                credentials:"include"
            }
        );

        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            return [];
        } else {
            console.log("Ok");
            const data = await response.json();
            return data.data;
        }

    } catch (err) {
        console.log("Loading error ");
        return [];
    }
}

// Get variants_detail of a cart by cartId:

export const loadVariantsByCartId = async (cartId) => {
    try {
        const response = await fetch(`${API_URL}/cart/${cartId}`,{
            method: 'GET',
            credentials:"include",
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            return [];
        }

        const data= await response.json();
        return data.itemsInCart;

    } catch (err) {
        console.log(err.message);
        return [];
    }
}

// create new cart 

export const createNewCart = async () => {
    try {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            credentials: "include",
        });
        
        if (response.status === 201) {
            console.log("Create new Cart OK");
            return true;
        } else {
            console.log("Fail to create new cart");
            return false;
        }

    
    } catch (err) {
        console.log(err.message);
        return false;
    }
}