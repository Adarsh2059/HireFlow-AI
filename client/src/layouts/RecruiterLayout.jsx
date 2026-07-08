import RecruiterSidebar from "../components/layout/RecruiterSidebar";
import Navbar from "../components/dashboard/Navbar";

function RecruiterLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-100">

      <RecruiterSidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}

export default RecruiterLayout;