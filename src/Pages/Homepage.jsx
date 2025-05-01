import { FaUserGraduate } from "react-icons/fa";

export function Homepage() {
    

    return (
        <section className="px-4 flex justify-center items-center flex-col gap-4 min-h-screen">
            <h1 className="text-[100px] sm:text-[250px]"><FaUserGraduate /></h1>
            <h1 className="text-xl sm:text-3xl font-bold sm:font-extrabold text-center">Welcome to Internship Tracker for Colleges</h1>
            <p className="text-sm sm:text-lg text-center">A tracker platform for faculty who track students internship and give reject/approval status.</p>
        </section>
    )
}
