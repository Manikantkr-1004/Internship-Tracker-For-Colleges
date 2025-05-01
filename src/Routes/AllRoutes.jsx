import { Route, Routes } from "react-router-dom";
import { Homepage } from "../Pages/Homepage";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { Forgot } from "../Pages/Forgot";
import { Profile } from "../Pages/Profile";
import { CreateInternship } from "../Pages/CreateInternship";
import { AllInternship } from "../Pages/AllInternship";
import { InternshipDetails } from "../Pages/InternshipDetails";
import { Faculty } from "../Pages/Faculty";
import { PrivateRoutes } from "./privateRoutes";


export function AllRoutes() {
    

    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/create" element={<PrivateRoutes role='student'><CreateInternship /></PrivateRoutes>} />
            <Route path="/internship" element={<AllInternship />} />
            <Route path="/internship/:id" element={<InternshipDetails />} />
            <Route path="/faculty" element={<PrivateRoutes role='faculty'><Faculty /></PrivateRoutes>} />
        </Routes>
    )
}
