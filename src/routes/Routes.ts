import Dashboard from 'src/views/Dashboard';
import ConsultantView from 'src/views/ConsultantView';
import TableList from 'src/views/TableList';
import Notifications from 'src/views/Notifications';
import Upgrade from 'src/views/Upgrade';
import Typography from 'src/views/Typography';
import Icons from 'src/views/Icons';
import Settings from 'src/views/Settings';

const PrivateRoutes = {
  admin: '/admin',
  reservationDetail: '/reservation/:uid',
};

const PublicRoutes = {
  root: '/',
  login: '/admin/login',
};

export const isPublicRoute = (path: string): boolean => (
  Object.values(PublicRoutes).includes(path)
);

export const isPrivateRoute = (path: string): boolean => (
  Object.values(PrivateRoutes).includes(path)
);

const Routes = {
  ...PublicRoutes,
  ...PrivateRoutes,
};

export default Routes;

export const dashboardRoutes = [
  {
    path: '/consultant',
    name: 'Consultant Info',
    icon: 'nc-icon nc-circle-09',
    component: ConsultantView,
    layout: '/admin',
  },
  {
    path: '/reservations',
    name: 'Reservation List',
    icon: 'nc-icon nc-notes',
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/app-settings',
    name: 'Settings',
    icon: 'nc-icon nc-settings-90',
    component: Settings,
    layout: '/admin',
  },
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard",
  //   name: "✨ Dashboard (Alpha)",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-paper-2",
  //   component: Typography,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },

  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
];
