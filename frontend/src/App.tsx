import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

//import Login from './pages/Login'
import Pos from './pages/Pos'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Pos />}>
      {/** <Route index element={<Dashboard />} />  */}
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App