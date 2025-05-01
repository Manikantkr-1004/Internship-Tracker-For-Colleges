import { useContext, useEffect, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export function AllInternship() {

    const [data, setData] = useState([]);
    const {isLoggedIn, user} = useContext(UserContext);

    useEffect(() => {
        const internships = localStorage.getItem("internships") ? JSON.parse(localStorage.getItem("internships")) : [];

        if(isLoggedIn && user?.role==='student'){
            const filteredInternships = internships.filter((ele)=> ele.studentId === user?.id);
            setData(filteredInternships);
        }else if(isLoggedIn && user?.role==='faculty'){
            const filteredInternships = internships.filter((ele)=> user?.assignedStudents?.includes(ele.studentId));
            setData(filteredInternships);
        }else{
            setData(internships);
        }
    }, [isLoggedIn, user]);
    

    return (
        <section className="px-4 py-10 flex justify-start items-center flex-col gap-2 min-h-screen">
            <h1 className="text-2xl font-bold text-yellow-500 flex items-center gap-1"><FaUserGraduate /> Uploaded Internships</h1>

            <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    data?.map((ele)=> (
                        <div key={ele?.id} className="flex flex-col self-start justify-start items-start gap-2 border border-slate-200 shadow-lg overflow-hidden rounded-lg">
                            <div className="w-full sm:h-[200px]">
                                <img src={ele?.photo} alt={ele?.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="w-full px-2 pb-2">
                                <h1 className="text-xl font-bold">{ele?.name}</h1>
                                <p className="text-gray-500 mb-1 line-clamp-2">{ele?.description}</p>
                                <p><span className="font-medium text-sm">Approval Status:</span> <span className={`text-white text-sm px-2 rounded-full font-medium ${ele?.status==='Pending' ?'bg-blue-500': ele?.status==='Approved'?'bg-green-500':'bg-red-500'}`}>{ele?.status}</span></p>
                                <Link to={`/internship/${ele?.id}`} className="w-full block text-center rounded-md font-medium bg-yellow-500 text-white py-1">{isLoggedIn?'View/Update Details':'View More'}</Link>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
