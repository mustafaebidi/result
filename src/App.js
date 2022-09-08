
import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ContainerPublicForm from './commponets/containerPublicForm/containerPublicForm';
import Login from './commponets/login/login';
import Signup from './commponets/signup/signup';
import { useSelector } from "react-redux";
import Forgetpassword from './commponets/forgetPassword';
import Main from './commponets/Main';
import Home from './commponets/Home';
import RequireAuth from './commponets/RequireAuth';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import IsAuth from './commponets/IsAuth';




function App() {


  const lang = useSelector((state)=>state.lang)



  useEffect(()=>{


    const language=lang.currentLocale

    document.body.classList.add(`${lang.currentLocale}`)


    return(()=>{
      document.body.classList.remove(`${language}`)
    })

  },[lang])


  return (
    <Fragment>

      <ToastContainer />

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
          </Route>
        </Route>


      </Routes>
    </Fragment>
  );
}

export default App;

//<div className='change' onClick={()=>dispatch(changeLang("ar"))}> redsad</div>
