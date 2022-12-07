import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../store/slice/auth"


const IsAuth = () => {

    const user = useSelector(selectCurrentUser)
    const location = useLocation()

    return (
        user
            ? <Navigate to="/" state={{ from: location }} replace />
            : <Outlet/>
    )
}
export default IsAuth