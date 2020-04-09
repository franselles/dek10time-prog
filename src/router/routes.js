export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/employees',
        name: 'Employees',
        component: () => import('@/views/employees/Employees.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/employee',
        name: 'Employee',
        component: () => import('@/views/employees/Employee.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/worktime',
        name: 'Worktime',
        component: () => import('@/views/worktime/Worktime.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@/views/worktime/Detail.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];
