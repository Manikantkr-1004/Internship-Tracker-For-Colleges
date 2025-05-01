import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const initialData = {
    email:"",
    password:"",
    role:""
}

export function Login() {

    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();
    const {isLoggedIn, login} = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, role } = formData;

        const usersData = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        const user = usersData.find((user) => user.email === email && user.password === password && user.role=== role );

        if(user){
            sessionStorage.setItem("user", JSON.stringify(user));
            toast.success("Login Successful");
            login(user);
            setFormData(initialData);
            navigate("/");
        }else{
            toast.error("Invalid Credentials");
        }
    }

    if(isLoggedIn){
        return navigate("/");
    }
    

    return (
        <section className="px-4 flex justify-center items-center flex-col gap-4 min-h-screen">
            <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-1/3 flex flex-col justify-start items-center gap-3.5 px-2 py-5">
                <h1 className="text-2xl text-yellow-500 text-center font-bold flex justify-center items-center gap-1.5"><FaUserGraduate /> Login</h1>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Enter Email</label>
                    <input 
                    value={formData.email} onChange={handleChange}
                    type="email" name="email" placeholder="Enter your email" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Enter Password</label>
                    <input 
                    value={formData.password} onChange={handleChange}
                    type="password" name="password" placeholder="Enter your password" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Login as a</label>
                    <select 
                    value={formData.role} onChange={handleChange}
                    name="role" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>
                </div>

                <p className="w-full text-right text-xs text-slate-500" onClick={()=> navigate("/forgot")}>Forgot Password?</p>

                <button className="w-full py-1.5 cursor-pointer bg-yellow-500 text-white font-medium rounded-md" type="submit">Login</button>

                <p className="text-xs text-slate-500">Don't have an account? <span onClick={() => navigate("/signup")} className="text-yellow-500 cursor-pointer">Signup</span></p>
            </form>
        </section>
    )
}
