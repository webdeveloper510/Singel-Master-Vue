export default [
  {
    path: '/adminUser/mass-trigger',
    name: 'admin-mass',
    component: () => import('@/views/Admin/trigger/Trigger.vue'),
  },
  {
    path: '/adminUser/affiliate-configuration',
    name: 'admin-affiliate-configuration',
    component: () => import('@/views/Admin/AffiliateConfiguration/AffiliateConfiguration.vue'),
  },
  {
    path: '/adminUser/moderator-configuration',
    name: 'admin-moderator-configuration',
    component: () => import('@/views/Admin/ModeratorConfiguration/ModeratorConfiguration.vue'),
  },

  {
    path: '/adminUser/moderator-configuration/:moderatorUsername',
    name: 'admin-moderator-configuration-detail',
    component: () => import('@/views/Admin/ModeratorConfiguration/ModeratorConfigurationDetail.vue'),
  },
  {
    path: '/adminUser/create-moderator',
    name: 'admin-create-moderator',
    component: () => import('@/views/Admin/create-moderator/CreateModerator.vue'),
  },
  {
    path: '/adminUser/customer-registration',
    name: 'admin-customer-registration',
    component: () => import('@/views/Admin/CustomerRegistration/CustomerRegistration.vue'),
  },
  {
    path: '/adminUser/customer-Management',
    name: 'admin-customer-management',
    component: () => import('@/views/Admin/CustomerManagement/CustomerManagement.vue'),
  },
  {
    path: '/adminUser/flirt-handle',
    name: 'admin-flirt-handling',
    component: () => import('@/views/Admin/FlirtHandling/FlirtHandling.vue'),
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
  {
    path: '/adminUser/create-subadmin',
    name: 'admin-create-subadmin',
    component: () => import('@/views/Admin/create-SubAdmin/createSubadmin.vue'),
  },
  {
    path: '/adminUser/subadmin-management',
    name: 'admin-create-management',
    component: () => import('@/views/Admin/create-SubAdmin/createSubadminInfo.vue'),
  },
]
