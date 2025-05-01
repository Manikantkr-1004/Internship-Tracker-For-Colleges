import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaUserGraduate } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

const initialData = {
    email: "",
    role: ""
}

export function Forgot() {

    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(UserContext);

    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, role } = formData;

        const usersData = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        const user = usersData.find((user) => user.email === email && user.role === role);

        if (user) {
            toast.success(`User Found! Your password is: ${user.password}`);
            setPassword(user.password);
            setFormData(initialData);
        } else {
            toast.error("User not found or invalid credentials");
        }
    }

    if(isLoggedIn) {
        return navigate("/");
    }



    return (
        <section className="px-4 flex justify-center items-center flex-col gap-4 min-h-screen">
            <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-1/3 flex flex-col justify-start items-center gap-3.5 px-2 py-5">
                <h1 className="text-2xl text-yellow-500 text-center font-bold flex justify-center items-center gap-1.5"><FaUserGraduate /> Get Password</h1>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Enter Registered Email</label>
                    <input
                        value={formData.email} onChange={handleChange}
                        type="email" name="email" placeholder="Enter your email" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
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

                {password && <p className="text-sm text-green-500">Your password is: {password}</p>}

                <button className="w-full py-1.5 cursor-pointer bg-yellow-500 text-white font-medium rounded-md" type="submit">Check Password</button>

                <p className="text-xs text-slate-500">Remembered Password? <span onClick={() => navigate("/login")} className="text-yellow-500 cursor-pointer">Login</span></p>
            </form>
        </section>
    )
}
