import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

import Login from './pages/Login'
import Pos from './pages/Pos'
import Analytics from './pages/Analytics'
import Dashboard from './Layouts/Dashboard'
import Order from './pages/Order';
import Product from './pages/Product';
import User from './pages/User';
import Setting from './pages/Setting';
import Stock from './pages/Stock';


// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/pos" element={<Pos />} />
      <Route path="/Dashboard" element={<Dashboard />}>
      	<Route index element={<Analytics />} />
      	<Route path="order" element={<Order />} />
      	<Route path="product" element={<Product />} />
      	<Route path="stock" element={<Stock />} />
      	<Route path="user" element={<User />} />
      	<Route path="setting" element={<Setting />} />
    </Route>
    </>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App