
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/upload',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/upload.vue') }
    ]
  },
  {
    path: '/director',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/director.vue') }
    ]
  },
  {
    path: '/manager',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/manager.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
