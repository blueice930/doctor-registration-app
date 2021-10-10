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
