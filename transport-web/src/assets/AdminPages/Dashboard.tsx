import {
  BellDot,
  CarFront,
  CreditCard,
  LayoutDashboard,
  LogOutIcon,
  MapIcon,
  SettingsIcon,
  UserRound,
  Fuel,
  LayoutList,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logo from "../bit.png";

interface SidebarItem {
  name: string;
  href?: string;
  icon: React.ElementType;
  children?: SidebarItem[];
}

const SIDEBAR_ITEMS: SidebarItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  {
    name: "Vehicles",
    icon: CarFront,
    children: [
      { name: "Vehicles Main", icon: CarFront, href: "/Vehicles" },
      { name: "Vehicles List", icon: LayoutList, href: "/Vehicle-List" },
    ],
  },
  { name: "Fuel & Mileage", icon: Fuel, href: "/FuelMileage" },
  { name: "Drivers", icon: UserRound, href: "/Drivers" },
  { name: "Duty Mapping", icon: MapIcon, href: "/DutyMapping" },
  { name: "Notifications", icon: BellDot, href: "/Notifications" },
  { name: "Purchase", icon: CreditCard, href: "/Purchase" },
  { name: "Settings", icon: SettingsIcon, href: "/Settings" },
  { name: "Logout", icon: LogOutIcon, href: "/Logout" },
];

function Dashboard() {
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Update selected menu item on route change
  useEffect(() => {
    setSelected(location.pathname);

    // Keep dropdown open if a child item is selected
    const activeDropdown = SIDEBAR_ITEMS.find(
      (item) => item.children && item.children.some((child) => child.href === location.pathname)
    );
    if (activeDropdown) {
      setOpenDropdown(activeDropdown.name);
    }
  }, [location.pathname]);

  // Toggle dropdown
  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-200 p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={18} />}
      </button>
 
      {/* Overlay to block background interaction */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-5 z-50 "
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-52 bg-white transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:w-55 p-4 border-r border-gray-300`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center justify-center mb-4">
          <img src={logo} alt="Logo" className="w-14 h-14 rounded-full" />
          <h3 className="ml-2 text-lg font-bold">Transport</h3>
        </div>

        {/* Navigation */}
        <nav>
          {SIDEBAR_ITEMS.map((item, index) => (
            <div key={index} className="mb-2">
              {item.children ? (
                <>
                  <div
                    className="flex items-center justify-between px-3 py-2 cursor-pointer rounded-lg hover:bg-gray-200"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    <div className="flex items-center">
                      <item.icon className="w-5 h-5" />
                      <span className="ml-3">{item.name}</span>
                    </div>
                    {/* Chevron remains open if a child is selected */}
                    {openDropdown === item.name || item.children.some((child) => child.href === selected) ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}
                  </div>

                  {/* Dropdown Items */}
                  {openDropdown === item.name && (
                    <div className="ml-6 space-y-1 transition-all">
                      {item.children.map((child, idx) => (
                        <Link key={idx} to={child.href!}>
                          <div
                            className={`flex items-center px-3 py-2 rounded-lg transition ${
                              selected === child.href ? "bg-blue-800 text-white" : "text-blue-800"
                            }`}
                          >
                            <child.icon className="w-4 h-4" />
                            <span className="ml-2 text-sm">{child.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={item.href!}>
                  <div
                    className={`flex items-center px-3 py-2 rounded-lg transition ${
                      selected === item.href ? "bg-blue-800 text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="ml-3">{item.name}</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Dashboard;
