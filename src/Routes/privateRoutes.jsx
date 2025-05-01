import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

export function PrivateRoutes({children, role}) {
    
    const {user, isLoggedIn} = useContext(UserContext);

    if(role){
        if(!isLoggedIn){
            return <Navigate to="/login" replace={true} />
        }else{
            if(user.role !== role){
                return <Navigate to="/" replace={true} />
            }
        }
    }else{
        if(!isLoggedIn){
            return <Navigate to="/login" replace={true} />
        }
    }

    return children;
}
