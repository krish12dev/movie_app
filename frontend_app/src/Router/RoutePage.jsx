import { BrowserRouter, Route, Routes } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import LoginPage from "../Pages/Login"
import Home from "../Pages/Home"
import SignUp from "../Pages/SignUp"

const RoutePage =() =>{
    return(
        <>
        <BrowserRouter>
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route path="/" element={<Home/>}/>
            </Route>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUp/>}/>
        </Routes>
        </BrowserRouter>
        </>
    )
}
export default RoutePage