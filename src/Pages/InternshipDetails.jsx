import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { UserContext } from "../Context/UserContext";
import { CreateInternship } from "./CreateInternship";
import { generateUniqueId } from "../Utils/UniqueId";
import toast from "react-hot-toast";

export function InternshipDetails() {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [report, setReport] = useState({});
    const {isLoggedIn, user} = useContext(UserContext);

    const [oldData, setOldData] = useState(null);
    const [reportStatus, setReportStatus] = useState(false);

    useEffect(() => {
        const internships = localStorage.getItem("internships") ? JSON.parse(localStorage.getItem("internships")) : [];
        const reports = localStorage.getItem("reports") ? JSON.parse(localStorage.getItem("reports")) : [];

        const find = internships.find((ele) => ele.id === id);
        const findReport = reports.find((ele)=> ele.internshipId === id);
        if (find) setData(find);
        if (findReport) setReport(findReport);
    }, [oldData, reportStatus])

    const handleReport = (e)=> {
        const file = e.target.files[0];
        const uniqueId = generateUniqueId();

        const newReport = {
            id: uniqueId,
            internshipId: id,
            studentId: user?.id,
            fileName: file.name,
            fileUrl: `https://trackinternshipmani.netlify.app/assets/uploaded/${file.name}`,
            uploadedAt: new Date().toISOString()
        };

        let internships = localStorage.getItem("internships") ? JSON.parse(localStorage.getItem("internships")) : [];
        internships = internships.map((ele)=> ele.id === id ? {...ele, reportId: id}: ele);
        localStorage.setItem("internships", JSON.stringify(internships));

        const reports = localStorage.getItem("reports") ? JSON.parse(localStorage.getItem("reports")) : [];
        reports.push(newReport);
        localStorage.setItem("reports", JSON.stringify(reports));

        toast.success("Report Uploaded Successfully");
        setReportStatus(false);
    }

    return (
        <>
        {oldData && <CreateInternship oldData={oldData} setOldData={setOldData} />}

        {reportStatus &&
            <section className="px-4 py-10 flex justify-start items-center flex-col gap-4 min-h-screen">
            <h1 className="text-2xl font-bold">Upload Report</h1>
            <p className="font-medium">{data?.name} Internship</p>
            <input onChange={handleReport} className="w-full md:w-1/3 h-20 border-dashed border border-yellow-400 rounded-lg hover:bg-yellow-100" type="file" />
            <button onClick={()=> setReportStatus(false)} className="bg-red-500 text-white px-4 py-1 rounded-md font-medium">Cancel Upload</button>
        </section>}

        {!oldData && !reportStatus &&
        <section className="px-4 py-10 flex justify-start items-center flex-col gap-4 min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-1">{data?.name ? data?.name : "Invalid Internship Id"}</h1>
            <div className="w-full lg:w-10/12 flex flex-col lg:flex-row justify-center items-start mt-5 gap-4">
                <div className="w-full lg:w-1/3 rounded-xl shadow-md border border-slate-200 overflow-hidden">
                    <img src={data?.photo} alt={data?.name} className="w-full object-cover" />
                    <p className="py-0.5 px-2">{data?.description ? data?.description : "Invalid Internship Id"}</p>
                    <p className="py-0.5 px-2 text-sm"><span className="font-medium">Contact:</span> {data?.contact ? data?.contact : "Invalid Internship Id"}</p>
                    <p className="py-0.5 px-2 text-sm"><span className="font-medium">Address:</span> {data?.address ? data?.address : "Invalid Internship Id"}</p>
                    {isLoggedIn && user.role==='student'&&
                        <div className="w-full flex justify-between items-center gap-1">
                        <button 
                        onClick={()=> setOldData(data)} disabled={Object.keys(data).length===0 || data?.status!=='Rejected'}
                        className="w-1/2 bg-yellow-500 rounded-md py-1 text-white font-medium m-1">Update Data</button>
                        <button 
                        onClick={()=> setReportStatus(true)} disabled={Object.keys(data).length===0 || data?.reportId}
                        className="w-1/2 bg-blue-500 rounded-md py-1 text-white font-medium m-1">{!data?.reportId ? "Upload Report":"Reported ✔️" }</button>
                    </div>}
                </div>
                <div className="w-full lg:w-8/12 flex flex-col gap-2">
                    <p><span className="font-medium">Student Details:</span> <Link to={`/profile/${data?.studentId}`}>Click here</Link></p>
                    <p><span className="font-medium">Internship Role:</span> {data?.role ? data?.role : "Invalid Internship Id"}</p>
                    <p><span className="font-medium">Internship Duration:</span> {data?.duration ? data?.duration : "Invalid Internship Id"}</p>
                    <p><span className="font-medium">Internship CreatedAt:</span> {data?.createdAt ? data?.createdAt : "Invalid Internship Id"}</p>
                    <p><span className="font-medium">Approval Status From Faculty:</span> <span className={`text-white py-1 px-2 rounded-full font-medium ${data?.status==='Pending' ?'bg-blue-500': data?.status==='Approved'?'bg-green-500':'bg-red-500'}`}>{data?.status}</span></p>

                    <div className="w-full mt-4 border-t border-gray-200 py-2">
                        <h2 className="text-lg font-bold">Internship Report Data</h2>
                        {!data?.reportId && <p className="text-red-500">Not uploaded yet</p>}
                        {data?.reportId && 
                            <div className="">
                                <p><span className="font-medium">File Name:</span> {report?.fileName ? report?.fileName : "Invalid Report Id"}</p>
                                <p><span className="font-medium">File URL:</span> {report?.fileUrl ? report?.fileUrl : "Invalid Report Id"}</p>
                                <p><span className="font-medium">Report UploadedAt:</span> {report?.uploadedAt ? report?.uploadedAt : "Invalid Report Id"}</p>
                            </div>
                        }
                    </div>

                    <div className="w-full mt-4 border-t border-gray-200 py-2">
                        <h2 className="text-lg font-bold">Faculty Comments</h2>
                        {data?.facultyComments?.length===0 && <p className="text-red-500">Not uploaded yet</p>}
                        {data?.facultyComments?.length>0 && 
                            <div className="w-full flex flex-col gap-2">
                                {data?.facultyComments?.reverse().map((ele) => {
                                    return (
                                        <div key={ele?.date} className="w-full text-sm flex flex-col gap-1 p-2 border border-slate-200 shadow-md rounded-lg">
                                            <p className="text-sm"><span className="font-medium">Date:</span> {ele?.date}</p>
                                            <p className="text-sm"><span className="font-medium">Comment:</span> {ele?.comment}</p>
                                            <p><span className="font-medium">Status:</span> <span className={`text-white text-sm px-2 rounded-full ${ele?.status==='Approved'?'bg-green-500':'bg-red-500'}`}>{ele?.status}</span></p>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
        }
        </>
    )
}
