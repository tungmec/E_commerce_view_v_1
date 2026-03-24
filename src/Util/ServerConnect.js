
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

export const addVariantToCartByCartId = async (cartId, variantId, quantity) => { 
    try {
        const id = Number(cartId);
        const response = await fetch(`${API_URL}/cart/${id}`,{
            method: 'POST',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                variantId: variantId,
                quantity: quantity,
            }),

        });

        if (!response.ok) {             
            const data = await response.json();
            console.log(data.message);
            return false;
        }

        const data = await response.json();
        console.log(data.message);
        return true;

    } catch(err) {
        console.log(err.message);
        return false;
    }

}

//  Update variant's quantity in active cart:

export const updateQuantityOfVariantInCart = async (cartId, variantId, quantity) => {
    try {
        const response = await fetch(`${API_URL}/cart/${cartId}`, {
            method: 'PUT',
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                variantId: variantId,
                quantity: quantity
            })
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            return false;
        }
        
        const data = await response.json();
        console.log(data.message);
        return true;

    } catch(err) {
        console.log(err.message);
        return false;
    } 
}

// Check out active cart function:

export const checkoutActiveCartById = async (cartId) => {
    try {
            const response = await fetch(`${API_URL}/cart/${Number(cartId)}/checkout`, {
                    method: 'POST',
                    credentials:"include",
            });
            
        if (!response.ok) {
            const data = await response.json();
            console.log("Checkout error: ", data.message);
            return false;
        }

        const data = await response.json();
        console.log(data.message);
        return true;
        

    } catch(err) {
        console.log("Checkout fault:");
        return false;
    }
}

//  Load all orders by user Id :

export const loadOrdersOfCurrentUser= async () => {
    try {
            const response = await fetch(`${API_URL}/orders`,{
                method: 'GET',
                credentials:"include"
            });
        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            return [];
        }

        const data = await response.json();
        console.log(data.message);
        return data.orderData;

    } catch(err) {
        console.log(err.message);
        return [];
    }

}

// Load all items by OrderId :
export const loadItemsByOrderId = async (orderId) => {
    try{
        const response = await fetch(`${API_URL}/orders/${orderId}`, {
            method:'GET',
            credentials:"include",
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            return [];
        }
        const data = await response.json();
        console.log(data.message);
        return data.itemsList;

    } catch(err) {
        console.log(err.message);
        return [];
    }
}

export const loadUserProfile = async () => {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
        method: 'GET',
        credentials:"include",
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            return null;
        }

        const data = await response.json();
        console.log(data.message);
        return data.profile;
    } catch(err) {
        console.log(err.message);
        return null;
    }
}

//  create profile:
export const createUserProfile = async (lastName, firstName, phoneNumber, email, address) => {
    try {
        const response = await fetch(`${API_URL}/users/me`, {
            method:'POST',
            credentials:"include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lastName:lastName,
                firstName:firstName,
                phoneNumber:phoneNumber,
                email:email,
                address:address,

            })
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            return false;
        }

        const data = await response.json();
        console.log(data.message);
        return true;

    } catch(err) {
        console.log(err.message);
        return false;
    }
}

// Update Profile
export const updateUserProfile = async (lastName, firstName, phoneNumber, email, address) => {
    try {
        const response = await fetch(`${API_URL}/users/me`,{
            method:'PUT',
            credentials:"include",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                lastName:lastName,
                firstName:firstName,
                phoneNumber:phoneNumber,
                email:email,
                address:address,
            })
        });
        
        if (!response.ok) {
            const data = await response.json();
            console.log(data.message);
            return false;
        }

        const data = await response.json();
        console.log(data.message);
        return true;

    } catch(err) {
        console.log(err.message);
        return false;
    }
}