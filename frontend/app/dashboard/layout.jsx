import Sidebar from "../../Components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center w-screen p-6 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}
