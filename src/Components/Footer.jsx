import { FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Footer() {
    

    return (
        <footer className="w-full px-4 py-8 bg-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:place-items-center">
            <div className="flex flex-col justify-start items-start gap-2">
                <Link to={'/'} className="text-white font-bold text-xl flex justify-center items-center gap-1.5"><FaUserGraduate className="text-2xl" /> Internship Tracker</Link>
                <p className="text-white text-sm">Internship tracker is a platform for tracking all students's Internship, Reports & Approval. As a Students we get approval from faculty.</p>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
                <h2 className="text-white font-bold text-lg">Quick Links</h2>
                <Link to={'/'} className="text-white text-sm hover:text-blue-200">Home</Link>
                <Link to={'/internship'} className="text-white text-sm hover:text-blue-200">Internship</Link>
                <Link to={'/'} className="text-white text-sm hover:text-blue-200">Login</Link>
                <Link to={'/'} className="text-white text-sm hover:text-blue-200">Faculty</Link>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
                <h2 className="text-white font-bold text-lg">Contact Us</h2>
                <p className="text-white text-sm">Email:tracker@gmail.com</p>
                <p className="text-white text-sm">Phone: +1 234 567 890</p>
                <p className="text-white text-sm">Address: 123 Kota St, BIhar</p>
            </div>
        </footer>
    )
}
