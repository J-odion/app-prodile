import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from '@/components/ui/input'
import { Search, X, AlignJustify, PieChart, BookOpen, BookText, ShoppingBag, Users, MessageCircle, UserCircle, LogOut, Scroll, Proportions, Settings } from 'lucide-react'
import NotificationModal from './NotificationModal'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import LogoutModal from '@/components/modal/student_dashboard/LogoutModal'


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
}



type Props = {
  page: string;
  toggleSideBar: boolean;
  setToggleSideBar: (toggleSideBar: boolean) => void;
};


const DashboardNav = ({page, toggleSideBar, setToggleSideBar}: Props) => {
  // const router = useRouter();
  const { route } = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogoutModal = () => {
    setOpen(!open);
}

  const handleToggleSidebar = () => setToggleSideBar(!toggleSideBar);


  return (
    <>
      {/* <nav className="fixed top-0 z-40 lg:ml-[16rem] w-full px-5 py-6 bg-white text-black md:px-10 lg:py-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-sm font-normal capitalize text-[#1C1C1C66]">{page}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex">
              <Search size="20" />
              <Input
                type="text"
                placeholder="Search"
                className="w-96"
              />
            </div>
            <NotificationModal
              notifications={notifications}
              notificationRefetch={() => {}}
            />
            <div className="cursor-pointer lg:hidden" onClick={handleToggleSidebar}>
              {toggleSideBar ? <X /> : <AlignJustify />}
            </div>
          </div>
        </div>
      </nav> */}
      <div className="cursor-pointer lg:hidden" onClick={handleToggleSidebar}>
              {toggleSideBar ? <X /> : <AlignJustify />}
            </div>
      {/* Mobile sidebar */}
      <aside
        className={`transition-width fixed z-40 flex h-screen bg-[#fff] shadow-lg duration-300 ease-in-out lg:hidden`}
      >
        {toggleSideBar && (
          <div className='flex flex-col pt-4 '>
            <div className="flex items-center gap-3 justify-center h-20">
            {/* <Image src='/images/prodile-logo-yellow.svg' width={100} height={100} alt='logo' /> */}
            </div>
            <h2 className="text-center text-[#222222] font-semibold text-[13px] uppercase">Menu</h2>
            <ul className="w-60 pt-10 text-[#959190]">
              <Link href="/dashboard">
                <li
                  className={
                    route === "/dashboard"
                      ? "bg-[--prodile-yellow] py-3 pl-10 text-white rounded-xl font-semibold text-sm"
                      : "my-1 py-3 pl-10 hover:bg-[--prodile-yellow] hover:text-[#1C1C1C] font-semibold text-sm rounded-xl"
                  }
                  onClick={() => setToggleSideBar(false)}
                >
                    <div className="flex items-center">
                      <span className="mr-3">
                        <PieChart size="20" />
                      </span>
                      Dashboard
                    </div>
                  </li>
              </Link>

              <Link href="/dashboard/mail">
                <li
                  className={
                    route === "/dashboard/mail"
                    ? "bg-[--prodile-yellow] py-3 pl-10 text-white rounded-xl font-semibold text-sm"
                    : "my-1 py-3 pl-10 hover:bg-[--prodile-yellow] hover:text-[#1C1C1C] font-semibold text-sm rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <Scroll size="20" />
                    </span>
                    Mail
                  </div>
                </li>
              </Link>


              <h2 className="text-center text-[#222222] font-semibold text-[13px] uppercase my-3">General</h2>
              <Link href="/dashboard/settings">
                <li
                  className={
                    route === "/dashboard/settings"
                    ? "bg-[--prodile-yellow] py-3 pl-10 text-white rounded-xl font-semibold text-sm"
                    : "my-1 py-3 pl-10 hover:bg-[--prodile-yellow] hover:text-[#1C1C1C] font-semibold text-sm rounded-xl"
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      <Settings size="20" />
                    </span>
                    Settings
                  </div>
                </li>
              </Link>

            </ul>

            <div
                className="fixed bottom-10 pl-10 flex flex-col items-center space-y-4 text-[#959190]"
                style={{ cursor: "pointer" }}
              >

                <div className="flex items-center" onClick={handleLogoutModal}>
                  <span className="mr-3">
                    <LogOut size="20" color="#D2322D" />
                  </span>
                  logout
                </div>
              </div>
          </div>
        )}
      </aside>
      {/* <LogoutModal open={open} setOpen={setOpen} title="Are you sure you want to logout?" /> */}
    </>
  )
}

export default DashboardNav
