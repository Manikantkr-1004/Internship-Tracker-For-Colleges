import { useContext, useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function Faculty() {

    const [data, setData] = useState([]);
    const { isLoggedIn, user } = useContext(UserContext);

    const [updateId, setUpdateId] = useState(null);
    const [form, setForm] = useState({
        comment:"",
        status:""
    })

    useEffect(() => {
        if(updateId) return;

        const internships = localStorage.getItem("internships") ? JSON.parse(localStorage.getItem("internships")) : [];

        if (isLoggedIn && user?.role === 'faculty') {
            const filteredInternships = internships.filter((ele) => user?.assignedStudents?.includes(ele.studentId));
            setData(filteredInternships);
        } else {
            setData(internships);
        }
    }, [isLoggedIn, user, updateId]);

    const updateStatus = () => {

        if(!form.comment.trim() || !form.status){
            return toast.error("Please fill both field.")
        }

        const internships = localStorage.getItem("internships") ? JSON.parse(localStorage.getItem("internships")) : [];
        const newData = internships.map((ele)=> ele.id === updateId ? {...ele, status: form.status, facultyComments: [...ele?.facultyComments, {comment: form.comment, status: form.status, date: new Date().toISOString()}]} : ele);

        let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        users = users.map((ele)=> ele.id ===user.id && !ele.reviewedInternships.includes(updateId) ? {...ele, reviewedInternships: [...ele.reviewedInternships, updateId]} : ele);

        localStorage.setItem("internships", JSON.stringify(newData));
        localStorage.setItem("users", JSON.stringify(users));
        setUpdateId(null);
        setForm({comment:"", status:""});
        toast.success("Status updated successfully.");
    }

    return (
        <section className="px-4 py-10 flex justify-start items-center flex-col gap-2 min-h-screen">
            <h1 className="text-2xl font-bold text-yellow-500 flex justify-center items-center gap-1"><FaUserGraduate /> Review Uploaded Internship</h1>

            <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    data?.map((ele)=> (
                        <div key={ele?.id} className="flex flex-col self-start justify-start items-start gap-2 border border-slate-200 shadow-lg overflow-hidden rounded-lg">
                            <div className="w-full sm:h-[200px]">
                                <img src={ele?.photo} alt={ele?.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full px-2 pb-2">
                                <h1 className="text-xl font-bold">{ele?.name}</h1>
                                <p className="text-gray-500 line-clamp-2">{ele?.description}</p>
                                <p><span className="font-medium text-sm">Approval Status:</span> <span className={`text-white text-sm px-2 rounded-full font-medium ${ele?.status==='Pending' ?'bg-blue-500': ele?.status==='Approved'?'bg-green-500':'bg-red-500'}`}>{ele?.status}</span></p>

                                {updateId && updateId===ele?.id &&
                                    <div className="w-full flex flex-col gap-1 my-1">
                                    <input className="w-full p-1 text-sm focus:outline-none border border-gray-200 shadow rounded-md"
                                    value={form.comment} onChange={(e)=> setForm((prev)=> ({...prev, comment: e.target.value}))} type="text" placeholder="Enter Comment..." />
                                    <select className="w-full p-1 text-sm focus:outline-none border border-gray-200 shadow rounded-md"
                                    value={form.status} onChange={(e)=> setForm((prev)=> ({...prev, status: e.target.value}))}>
                                        <option value="">--Select Status--</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>}
                                
                                <div className="w-full text-sm flex justify-between items-center gap-2 mt-2">
                                    <button disabled={updateId && updateId!==ele?.id}
                                    onClick={()=> updateId? setUpdateId(null): setUpdateId(ele?.id)} 
                                    className="w-full bg-gray-900 text-white rounded-md font-medium py-1">{updateId===ele?.id?"Cancel for Now":"Update Status"}</button>
                                    
                                    {updateId===ele?.id && <button onClick={updateStatus} className="bg-blue-500 w-1/2 text-white rounded-md py-1 font-medium">Update Now</button>}
                                    {!updateId && <Link to={`/internship/${ele?.id}`} className="w-1/2 block text-center rounded-md font-medium bg-yellow-500 text-white py-1">See Details</Link>}
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
