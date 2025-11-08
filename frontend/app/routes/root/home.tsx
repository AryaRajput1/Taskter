import { Button } from "@/components/ui/button";
import type { describe } from "node:test";
import { Link } from "react-router";

export function meta() {
  return [
    { title: "Taskter" },
  ];
}

const HomePage = () => {
  return (
    <div className="h-screen flex justify-center items-center gap-4">
      <Link to={'/login'}>
        <Button className="bg-blue-500 text-white cursor-pointer">
          Login
        </Button>
      </Link>
      <Link to={'/sign-up'}>
        <Button className="bg-blue-500 text-white cursor-pointer">
          Sign Up
        </Button>
      </Link>

    </div>
  )
}

export default HomePage