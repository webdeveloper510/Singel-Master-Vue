export default [
  {
    path: '/profile-edit',
    name: 'profile-edit',
    component: () => import('@/views/Customer/Profile-Edit/ProfileEditInfo.vue'),
  },
  {
    path: '/members',
    name: 'members',
    component: () => import('@/views/Customer/Members.vue'),
  },
  {
    path: '/flirtar',
    name: 'flirtar',
    component: () => import('@/views/Customer/Flirtar/Flirtar.vue'),
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@/views/Customer/pricing/Pricing.vue'),
  },
  {
    path: '/customer/chat/:chatId',
    name: 'customer-chat-spec',
    component: () => import('@/views/Customer/chat/Chat.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'chat-application',
    },
  },
  {
    path: '/customer/chat',
    name: 'customer-chat',
    component: () => import('@/views/Customer/chat/Chat.vue'),
    // component: () => import('@/views/apps/chat/Chat.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'chat-application',
    },
  },
  {
    path: '/model-profile/:model_id',
    name: 'model-profile',
    component: () => import('@/views/Customer/model-profile/Profile.vue'),
  },
]
