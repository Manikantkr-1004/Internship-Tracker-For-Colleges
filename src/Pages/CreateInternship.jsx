import { useContext, useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { UserContext } from "../Context/UserContext";
import toast from "react-hot-toast";
import { generateUniqueId } from "../Utils/UniqueId";

const initialData = {
    name:"",
    photo:"",
    role:"",
    duration:"",
    contact:"",
    address:"",
    description:"",
}

export function CreateInternship({oldData,setOldData}) {

    const [formData, setFormData] = useState(initialData);
    const {user} = useContext(UserContext);

    useEffect(() => {
        if(oldData) {
            setFormData({
                name: oldData.name,
                photo: oldData.photo,
                role: oldData.role,
                duration: oldData.duration,
                contact: oldData.contact,
                address: oldData.address,
                description: oldData.description,
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(oldData) return handleUpdate();
        
        const internships = localStorage.getItem("internships") ? JSON.parse(localStorage.getItem("internships")) : [];
        let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        const id = generateUniqueId();

        const newInternship = {
            ...formData,
            id,
            reportId: null,
            status:"Pending",
            facultyComments: [],
            createdAt: new Date().toISOString(),
            studentId: user?.id,
        }

        users = users.map((ele)=> ele.id === user.id ? {...ele, internships: [...ele.internships, id]} : ele);
        localStorage.setItem("users", JSON.stringify(users));

        internships.push(newInternship);
        localStorage.setItem("internships", JSON.stringify(internships));
        setFormData(initialData);
        toast.success("Internship Logged Successfully!");
    }

    const handleUpdate = () => {
        let internships = localStorage.getItem("internships") ? JSON.parse(localStorage.getItem("internships")) : [];
        internships = internships.map((ele) => ele.id === oldData.id ? {...ele, ...formData} : ele);
        localStorage.setItem("internships", JSON.stringify(internships));
        setOldData(null);
        toast.success("Internship Updated Successfully!");
        setFormData(initialData);
    }
    

    return (
        <section className="px-4 py-10 flex justify-start items-center flex-col gap-2 min-h-screen">
            <h1 className="text-2xl font-bold text-yellow-500 flex items-center gap-1"><FaUserGraduate /> {oldData? "Update":"Log"} Internship</h1>
            
            <form onSubmit={handleSubmit} className="w-full sm:w-[80%] lg:w-1/3 flex flex-col justify-start items-center gap-3.5 px-2 py-5">

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Company name</label>
                    <input 
                    value={formData.name} onChange={handleChange}
                    type="text" name="name" placeholder="Enter Company name" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Your Role</label>
                    <input 
                    value={formData.role} onChange={handleChange}
                    type="text" name="role" placeholder="Enter your Role" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Internship Duration</label>
                    <input 
                    value={formData.duration} onChange={handleChange}
                    type="text" name="duration" placeholder="Enter Internship Duration" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Company Contact</label>
                    <input 
                    value={formData.contact} onChange={handleChange}
                    type="text" name="contact" placeholder="Enter Contact Either email or phone" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Company Address</label>
                    <input 
                    value={formData.address} onChange={handleChange}
                    type="text" name="address" placeholder="Enter Company Address" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Internship Description</label>
                    <input 
                    value={formData.description} onChange={handleChange}
                    type="text" name="description" placeholder="Enter Internship description" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <label className="text-sm font-semibold">Company Photo URL</label>
                    <input 
                    value={formData.photo} onChange={handleChange}
                    type="url" name="photo" placeholder="Enter Pic URL" className="w-full border border-slate-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500" required />
                </div>

                {formData?.photo && 
                <div className="w-full">
                    <img className="max-w-full" src={formData.photo} alt={formData.name} />
                </div>}

                <button className="w-full py-1.5 cursor-pointer bg-yellow-500 text-white font-medium rounded-md" type="submit">{oldData?"Update":"Add"}</button>
                {oldData && <button onClick={()=> setOldData(null)} className="w-full py-1.5 cursor-pointer bg-red-500 text-white font-medium rounded-md">Cancel</button>}
            </form>
        </section>
    )
}
