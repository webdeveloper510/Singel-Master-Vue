export default [
  {
    path: '/moderator/lobby',
    name: 'moderator-lobby',
    component: () => import('@/views/Moderator/lobby/lobby.vue'),
  },
  {
    path: '/moderator/affiliate',
    name: 'moderator-affiliate',
    component: () => import('@/views/Moderator/affiliate/Affiliate.vue'),
  },
  {
    path: '/moderator/statistics',
    name: 'moderator-statistics',
    component: () => import('@/views/Moderator/statistics/Statistics.vue'),
  },
  {
    path: '/moderator/model/create',
    name: 'moderator-create-model',
    component: () => import('@/views/Moderator/create-model/CreateModel.vue'),
  },
  {
    path: '/moderator/members',
    name: 'moderator-members',
    component: () => import('@/views/Moderator/Members.vue'),
  },
  {
    path: '/moderator/trigger-message/select-customer?model=:model_id',
    name: 'moderator-trigger-message-select-customer',
    component: () => import('@/views/Moderator/trigger/Customers.vue'),
  },
  {
    path: '/moderator/trigger-message/select-model?customer=:customer_id',
    name: 'moderator-trigger-message-select-model',
    component: () => import('@/views/Moderator/trigger/Models.vue'),
  },
  {
    path: '/moderator/trigger-message/:customer_id/',
    name: 'moderator-trigger-message-customer',
    component: () => import('@/views/Moderator/trigger/Trigger.vue'),
  },
  {
    path: '/moderator/trigger-message/',
    name: 'moderator-trigger-message',
    component: () => import('@/views/Moderator/trigger/Trigger.vue'),
  },
  {
    path: '/moderator/model/edit/:model_id',
    name: 'moderator-model-edit',
    component: () => import('@/views/Moderator/edit-model/EditModel.vue'),
  },
  {
    path: '/moderator/chat/:chat_id',
    name: 'moderator-chat',
    component: () => import('@/views/Moderator/chat/Chat.vue'),
    meta: {
      contentRenderer: 'sidebar-left',
      contentClass: 'chat-application moderator-chat',
    },
  },
]
