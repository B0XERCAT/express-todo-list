import { Link } from "react-router-dom";
export default function Header() {
  return (
    <div className="w-full bg-blue-500 text-white text-center py-4 font-bold text-3xl">
      <Link to="/">TODO List</Link>
    </div>
  );
}
