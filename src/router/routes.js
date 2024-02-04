export const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/MainPage'),
    children: [
      {
        path: ' /:id',
        name: 'detailRoute',
        component: () => import('@/views/DetailRoute')
      }
    ]
  }
]
