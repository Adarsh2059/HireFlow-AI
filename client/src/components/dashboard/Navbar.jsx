import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  const title =
    user?.role === "recruiter"
      ? "Recruiter Dashboard"
      : "Candidate Dashboard";

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      <div className="text-right">

        <p className="font-semibold">
          {user?.name}
        </p>

        <p className="text-sm text-slate-500">
          {user?.email}
        </p>

      </div>

    </header>
  );
}

export default Navbar;