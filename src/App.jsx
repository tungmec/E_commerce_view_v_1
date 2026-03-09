import react from 'react';
import {createBrowserRouter, createRoutesFromElements, Route} from 'react-router-dom';
import { RootLayout } from './Layouts/RootLayout';
import { Home } from './Component/Home/Home';
import { Products } from './Component/Products/Products';

  export const router = createBrowserRouter(createRoutesFromElements(
    <Route 
      path='/'
      element={<RootLayout/>}
    >
      <Route index element={<Home />} />
      <Route path='/Products' element={<Products />} />
    </Route>
  ));
 



