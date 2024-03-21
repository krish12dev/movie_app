import { Route, Redirect, Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () =>{
    const token  = localStorage.getItem("token")
    console.log(token)
    let auth = {token}
    return (
        auth?.token ? <Outlet/> : <Navigate to ='/login'/>
    )
}
export default PrivateRoute;
