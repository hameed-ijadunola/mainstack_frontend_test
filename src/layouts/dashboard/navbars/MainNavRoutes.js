import { v4 as uuid } from 'uuid';
import { ReactComponent as Home } from 'assets/svg/home.svg';
import { ReactComponent as Analytics } from 'assets/svg/insert_chart.svg';
import { ReactComponent as Revenue } from 'assets/svg/payments.svg';
import { ReactComponent as CRM } from 'assets/svg/group.svg';
import { ReactComponent as Apps } from 'assets/svg/widgets.svg';
const MainNavRoutes = [
  {
    id: uuid(),
    menuitem: 'Home',
    icon: <Home />,
    link: '#',
  },
  {
    id: uuid(),
    menuitem: 'Analytics',
    icon: <Analytics />,
    link: '#',
  },
  {
    id: uuid(),
    menuitem: 'Revenue',
    icon: <Revenue />,
    link: '/',
  },
  {
    id: uuid(),
    menuitem: 'CRM',
    icon: <CRM />,
    link: '#',
  },
  {
    id: uuid(),
    menuitem: 'Apps',
    icon: <Apps />,
    link: '#',
  },
];

export default MainNavRoutes;
