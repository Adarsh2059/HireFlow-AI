import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

function MainLayout() {
  return (
    <div className="min-h-screen p-10 bg-slate-100">

      <div className="max-w-md space-y-4">

        <Input
          placeholder="Enter your email"
        />

        <Button>
          Login
        </Button>

      </div>

    </div>
  );
}

export default MainLayout;
