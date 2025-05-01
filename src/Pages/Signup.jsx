import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import toast from "react-hot-toast";
import { generateUniqueId } from "../Utils/UniqueId";
import { FaUserGraduate } from "react-icons/fa";

const initialData = {
    name:"",
    email:"",
    password:"",
    address:"",
    role:"",
    department:"",
}

export function Signup() {

    const [formData, setFormData] = useState(initialData);
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, role } = formData;

        let usersData = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        const checkExist = usersData.find((user) => user.email === email && user.role=== role );

        if(checkExist){
            toast.error("User already exists");
        }else{
            const id = generateUniqueId();
            const assignedStudents = role==='faculty'? usersData.filter((user) => user.department === formData.department && user.role === "student").map((user) => user.id): [];
            if(role ==='student') usersData = usersData.map((ele)=> ele.role==='faculty' && ele.department===formData.department ? {...ele, assignedStudents: [...ele.assignedStudents, id]}: ele );

            const newData = role==='student' ? {id, internships:[], ...formData} : {id, ...formData, assignedStudents, reviewedInternships: []};
            usersData.push(newData);
            localStorage.setItem("users", JSON.stringify(usersData));
            toast.success("Account Created Successfully");
            navigate("/login");
        }
    }

    if(isLoggedIn){
        return navigate("/");
    }


    return (
        <section className="px-4 py-10 flex justify-center items-center flex-col gap-4 min-h-screen">
            <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-1/3 flex flex-col justify-start items-center gap-3.5 px-2 py-5">
                <h1 className="text-2xl text-yellow-500 text-center font-bold flex justify-center items-center gap-1.5"><FaUserGraduate /> Create Account</h1>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Enter Name</label>
                    <input
                        value={formData.name} onChange={handleChange}
                        type="text" name="name" placeholder="Enter your name" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

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
                    <label className="text-sm font-semibold">Enter Address</label>
                    <input
                        value={formData.address} onChange={handleChange}
                        type="text" name="address" placeholder="Enter your address" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Signup as a</label>
                    <select 
                    value={formData.role} onChange={handleChange}
                    name="role" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
                        <option value="">Select Role</option>
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </select>
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Choose Department</label>
                    <select 
                    value={formData.department} onChange={handleChange}
                    name="department" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required>
                        <option value="">Select Department</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics and Communication">Electronics and Communication</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                    </select>
                </div>

                <button className="w-full py-1.5 cursor-pointer bg-yellow-500 text-white font-medium rounded-md" type="submit">Signup</button>

                <p className="text-sm text-slate-500">Already have an account? <Link to="/login" className="text-yellow-500 font-semibold">Login</Link></p>
            </form>
        </section>
    )
}
