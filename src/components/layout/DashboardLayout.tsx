import { useState } from 'react'
import DashboardNav from './DashboardNav';
import { Grid2X2, Proportions, Scroll, Settings, Users } from 'lucide-react';


type DashboardPages =
  |'overview'
  |'product-units'
  |'agents'
  |'resources'
  |'settings'
  | 'mail'


  type DashboardIcons  = {
    overview: JSX.Element;
    'product-units': JSX.Element;
    agents: JSX.Element;
    resources: JSX.Element;
    settings: JSX.Element;
  };



  export const icons: DashboardIcons = {
    overview: <Grid2X2 size="20"/>,
    'product-units': <Scroll size="20" />,
    agents: <Users size="20" />,
    resources: <Proportions size="20" />,
    settings: <Settings size="20" />,
  }


type DashboardLayoutProps = React.PropsWithChildren & {
  page: DashboardPages;
  children?: React.ReactNode;
};

const DashboardLayout = ({ children, page, }: DashboardLayoutProps) => {

  const [toggleSideBar, setToggleSideBar] = useState(false);

  return (
    <>
      <div className="relative">
        <DashboardNav
          page={page}
          toggleSideBar={toggleSideBar}
          setToggleSideBar={setToggleSideBar}
         />
          {children}
      </div>
    </>
  )
}

export default DashboardLayout
