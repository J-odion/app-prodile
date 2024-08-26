import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { X, AlignJustify, PieChart, LogOut, Scroll, Settings } from 'lucide-react';
import Link from 'next/link';

const notifications = {
  count: 2,
  results: [
    {
      id: 1,
      message: "New message from admin",
      is_read: false,
      created_at: "2022-02-02T12:00:00Z",
    },
    {
      id: 2,
      message: "New message from admin",
      is_read: false,
      created_at: "2022-02-02T12:00:00Z",
    },
  ],
};

type Props = {
  page: string;
  toggleSideBar: boolean;
  setToggleSideBar: (toggleSideBar: boolean) => void;
};

const DashboardNav = ({ page, toggleSideBar, setToggleSideBar }: Props) => {
  const { route } = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogoutModal = () => {
    setOpen(!open);
  };

  const handleToggleSidebar = () => setToggleSideBar(!toggleSideBar);

  return (
    <>
      <div className="cursor-pointer lg:hidden flex justify-end p-4" onClick={handleToggleSidebar}>
        {toggleSideBar ? <X size={24} /> : <AlignJustify size={24} />}
      </div>
      {/* Mobile sidebar */}
      <aside
        className={`transition-width fixed top-0 right-0 z-40 h-full w-60 bg-slate-400 shadow-lg duration-300 ease-in-out lg:hidden ${
          toggleSideBar ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {toggleSideBar && (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4">
              <div className="text-lg font-semibold text-white">Menu</div>
              <X className="cursor-pointer" onClick={handleToggleSidebar} size={24} />
            </div>
            <ul className="flex-1 pt-4 text-[#959190]">
              <Link href="/dashboard">
                <li
                  className={`my-1 py-3 pl-10 ${
                    route === '/dashboard'
                      ? 'bg-[--prodile-yellow] text-white'
                      : 'hover:bg-[--prodile-yellow] text-black hover:text-[#1C1C1C]'
                  } rounded-xl font-semibold text-sm`}
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <PieChart size={20} className="mr-3" />
                    Dashboard
                  </div>
                </li>
              </Link>
              <Link href="/dashboard/mail">
                <li
                  className={`my-1 py-3 pl-10 ${
                    route === '/dashboard/mail'
                      ? 'bg-[--prodile-yellow] text-white'
                      : 'hover:bg-[--prodile-yellow] text-black hover:text-[#1C1C1C]'
                  } rounded-xl font-semibold text-sm`}
                  onClick={() => setToggleSideBar(false)}
                >
                  <div className="flex items-center">
                    <Scroll size={20} className="mr-3" />
                    Mail
                  </div>
                </li>
              </Link>
              
            </ul>
            <div
              className="flex items-center justify-center p-4 text-[#959190] cursor-pointer"
              onClick={handleLogoutModal}
            >
              <LogOut size={20} color="#D2322D" className="mr-3" />
              Logout
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default DashboardNav;
