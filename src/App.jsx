import react from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import { RootLayout } from './Layouts/RootLayout';
import { Home } from './Component/Home/Home';
import { Products } from './Component/Products/Products';
import { Cart } from './Component/Cart/Cart';
import { Orders } from './Component/Orders/Orders';

  export const router = createBrowserRouter(createRoutesFromElements(
    <Route 
      path='/'
      element={<RootLayout/>}
    >
      <Route 
        index 
        element={<Home />} 
      />

      <Route 
        path='/Products' 
        element={<Products />} 
      />

      <Route 
        path='/Cart' 
        element={<Cart />} 
      />

      <Route 
        path='/Orders' 
        element={<Orders />} 
      />
      
    </Route>
  ));
 



