import './App.css';
import Navbar from './components/shared/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import { RouterProvider , createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Jobs from './components/Jobs';
import Browse from './components/Browse';
import Profile from './components/Profile';
import Companies from './admin/Companies';
import JobDescription from './components/JobDescription';
import CompanyCreate from './admin/CompanyCreate';
import CompanySetup from './admin/CompanySetup';
import AdminJobs from './admin/AdminJobs';
import PostJob from './admin/PostJob';
import Applicants from './admin/Applicants';
import ProtectedRoute from './admin/ProtectedRoute';
const appRouter = createBrowserRouter([
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },
        {
          path:'/jobs',
          element:<Jobs/>
        },
        {
          path : "/description/:id",
          element:<JobDescription />
        },
        {
          path:'/browse',
          element:<Browse/>
        }
        ,        {
          path:'/profile',
          element:<Profile/>
        },

//for admin panel

        {
          path:"/admin/companies",
          element:<ProtectedRoute><Companies/></ProtectedRoute>
        }
        ,
        {
          path:"/admin/companies/create",
          element:<ProtectedRoute><CompanyCreate/></ProtectedRoute> 
        }
         ,
        {
          path:"/admin/companies/:id",
          element: <ProtectedRoute><CompanySetup/></ProtectedRoute>
        }
        ,
        {
          path:"/admin/jobs",
          element: <ProtectedRoute> <AdminJobs/></ProtectedRoute>
        },
         {
          path:"/admin/jobs/create",
          element: <ProtectedRoute> <PostJob/></ProtectedRoute>
        }
        ,
         {
          path:"/admin/jobs/:id/applicants",
          element: <ProtectedRoute> <Applicants/></ProtectedRoute>
        }


]);

function App() {
  return (
   <>
    <RouterProvider router ={appRouter} />

   </>
  )
}
export default App;