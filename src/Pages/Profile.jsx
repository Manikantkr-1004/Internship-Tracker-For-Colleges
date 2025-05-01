import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Profile() {

    const { id } = useParams();
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];
        const user = users.find(user => user.id === id);

        user ? setUserData(user) : setUserData({});
    }, [id])

    return (
        <section className="px-4 py-10 flex justify-center items-center flex-col gap-2 min-h-screen">
            <img src={`https://ui-avatars.com/api/?background=000&color=fff&name=${userData?.name ? userData?.name : "NN"}&bold=true&format=png&rounded=true&size=128`} alt={`${userData?.name}`} />
            <h1 className="text-2xl font-bold">{userData?.name ? userData?.name : "Invalid User Id"}</h1>
            <p className="text-gray-500">{userData?.email ? userData?.email : "No email found"}</p>
            <p className="text-gray-500">{userData?.address ? userData?.address : "No address found"}</p>
            <p className="text-gray-500">{`He/She is ${userData?.role?.toUpperCase()} at this Platform.`}</p>

            {userData.role === 'student' &&
                <div className="flex justify-center items-center gap-4 flex-wrap mt-3 py-5 border-t border-gray-300">
                    <div className="flex flex-col justify-start items-start p-2 rounded-lg shadow-md border border-slate-300">
                        <h1 className="text-xl text-yellow-500 font-bold">Department</h1>
                        <p className="text-gray-500">{userData?.department}</p>
                    </div>
                    <div className="flex flex-col justify-start items-start p-2 rounded-lg shadow-md border border-slate-300">
                        <h1 className="text-xl text-yellow-500 font-bold">Uploaded Internships</h1>
                        <p className="text-gray-500">{userData?.internships?.length}</p>
                    </div>
                </div>
            }

            {userData.role === 'faculty' &&
                <div className="flex justify-center items-center gap-4 flex-wrap mt-3 py-5 border-t border-gray-300">
                    <div className="flex flex-col justify-start items-start p-2 rounded-lg shadow-md border border-slate-300">
                        <h1 className="text-xl text-yellow-500 font-bold">Assigned Students</h1>
                        <p className="text-gray-500">{userData?.assignedStudents?.length}</p>
                    </div>
                    <div className="flex flex-col justify-start items-start p-2 rounded-lg shadow-md border border-slate-300">
                        <h1 className="text-xl text-yellow-500 font-bold">Reviewd Internships</h1>
                        <p className="text-gray-500">{userData?.reviewedInternships?.length}</p>
                    </div>
                </div>
            }

        </section>
    )
}
