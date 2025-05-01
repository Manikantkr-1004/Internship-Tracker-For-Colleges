import { useContext, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export function Navbar() {

    const { user, logout, isLoggedIn } = useContext(UserContext);
    const [openMenu, setOpenMenu] = useState(false);

    const handleMenuToggle = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <nav className="w-full h-16 bg-yellow-500 fixed top-0 flex justify-between items-center gap-4 px-4">
            <Link to={'/'} className="text-white font-bold text-xl flex justify-center items-center gap-1.5"><FaUserGraduate className="text-2xl" /> Internship Tracker</Link>

            <div className="flex justify-between items-center gap-4 font-medium">
                <Link to={'/'} className="hover:text-white hidden sm:block">Home</Link>
                {!isLoggedIn && <Link to={'/login'} className="hover:text-white hidden sm:block">Login</Link>}
                <Link to={'/internship'} className="hover:text-white hidden sm:block">Internships</Link>

                <div className="relative w-8 h-8 rounded-full cursor-pointer">
                    <img onClick={handleMenuToggle} src={`https://ui-avatars.com/api/?background=000&color=fffff&name=${isLoggedIn ? user?.name:'='}&bold=true&format=png&rounded=true`} alt={`${user?.name}`} />

                    {openMenu &&
                        <div className="absolute right-0 top-10 shadow bg-white rounded-md w-[200px] p-2">
                        {isLoggedIn && <p className="text-sm text-slate-900">{user?.name}</p>}
                        {isLoggedIn && <p className="text-xs border-b border-slate-200 pb-1 text-slate-700">{user?.email}</p>}
                        <div className="flex flex-col gap-0 mt-2 text-slate-600 text-sm">
                            {!isLoggedIn && <Link onClick={handleMenuToggle} to={'/login'} className="hover:bg-slate-100 p-1 rounded-sm">Login</Link>}
                            {isLoggedIn && <Link onClick={handleMenuToggle} to={`/profile/${user?.id}`} className="hover:bg-slate-100 p-1 rounded-sm">Profile</Link>}
                            <Link onClick={handleMenuToggle} to={'/internship'} className="hover:bg-slate-100 p-1 rounded-sm">Internships</Link>
                            {isLoggedIn && user?.role==='student' && <Link onClick={handleMenuToggle} to={'/create'} className="hover:bg-slate-100 p-1 rounded-sm">Register</Link>}
                            {isLoggedIn && user?.role==='faculty' && <Link onClick={handleMenuToggle} to={'/faculty'} className="hover:bg-slate-100 p-1 rounded-sm">Faculty</Link>}
                            {isLoggedIn && <button className="bg-red-500 text-white rounded-sm py-1 cursor-pointer hover:bg-red-600" onClick={()=> {logout(); handleMenuToggle()}}>
                                Logout
                            </button>}
                        </div>
                    </div>}

                </div>

            </div>
        </nav>
    )
}
