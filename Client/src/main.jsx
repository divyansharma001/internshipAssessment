import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import FeedbackPage from './Pages/FeedbackPage/FeedbackPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },{
    path: "/feedback",
    element: <FeedbackPage/>,
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
