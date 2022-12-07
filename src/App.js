
import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ContainerPublicForm from './commponets/ContainerPublicForm';
import Login from './page/login';
import Signup from './page/signup';
import { useSelector } from "react-redux";
import Forgetpassword from './commponets/forgetPassword';
import Main from './commponets/Main';
import Home from './page/Home';
import RequireAuth from './commponets/RequireAuth';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import IsAuth from './commponets/IsAuth';
import SingleResult from './page/SinglePageResult';
import ResultsList from './page/ResultsList';




function App() {




  return (
    <Fragment>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>

        <Route element={<IsAuth />}>
          <Route  element={<ContainerPublicForm />}>
            <Route  path="login" element={<Login />} />
            <Route  path="signup" element={<Signup />} />
            <Route  path="forget-password" element={<Forgetpassword />} />
          </Route>
        </Route>


        <Route element={<RequireAuth/>}>
          <Route element={<Main/>}>
            <Route  path="/" element={<Home />} />
            <Route  path="singleResult/:number" element={<SingleResult />} />
            <Route  path="results" element={<ResultsList/>} />
          </Route>
        </Route>


      </Routes>
      
    </Fragment>
  );
}

export default App;

