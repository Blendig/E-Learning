import { createRouter, createWebHistory } from 'vue-router'
import {ROUTES} from '../constants'
import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import ForgotPasswordView from '../views/ForgotPasswordView.vue'
import ListeningView from '../views/ListeningView.vue'
import ListeningTopicsView from '../views/ListeningTopicsView.vue'
import ListeningByTopicsView from '../views/ListeningByTopicsView.vue'
import GrammarLevelsView from '../views/GrammarLevelsView.vue'
import GrammarByLevelsView from '../views/GrammarByLevelsView.vue'


//-------------------vuex store----------------
import store from '../store'



//----------------------------------------------
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationView,
       
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,

    },
    {
      path: ROUTES.LISTENING,
      exact: true,
      isProtect: true,
      component: ListeningView,
      role: ["user", "instructor", "admin"],
      meta: {requiresAuth: true}
    
    },
    {
      path: ROUTES.LISTENING_TOPICS,
      exact: true,
      isProtect: true,
      component: ListeningTopicsView,
      role: ["user", "instructor", "admin"],
      meta: {requiresAuth: true}
    },
    {
      path: ROUTES.LISTENING_BY_TOPIC,
      exact: true,
      isProtect: true,
      component: ListeningByTopicsView,
      role: ["user", "instructor", "admin"],
      meta: {requiresAuth: true}
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: ROUTES.GRAMMAR_LEVELS,
      exact: true,
      isProtect: true,
      component: GrammarLevelsView ,
      meta: {requiresAuth: true},
      role: ["user", "instructor", "admin"],
    },
    {
      path: ROUTES.GRAMMAR_BY_LEVEL,
      exact: true,
      isProtect: true,
      component: GrammarByLevelsView ,
      role: ["user", "instructor", "admin"],
      meta: {requiresAuth: true}
    },
    {
      path: ROUTES.PROFILE,
      exact: true,
      isProtect: true,
      component:()=>import('../views/ProfileView.vue') ,
      role: ["user", "instructor", "admin"],
      meta: {requiresAuth: true}
    },
    {
      path: ROUTES.LOGOUT,
      exact: true,
      component:()=>import('../views/LogoutView.vue') ,
   
    },
    {
    path: ROUTES.WORD_TOPIC,
    exact: true,
    isProtect: true,
      component:()=>import('../views/WordTopicView.vue'),
    role: ["user", "instructor", "admin"],
    meta: {requiresAuth: true}
  },
  {
    path: ROUTES.VOCABULARY,
    exact: true,
    isProtect: true,
      component:()=>import('../views/VocabularyView.vue'),
    role: ["user", "instructor", "admin"],
    meta: {requiresAuth: true}
  },
  {
    path: ROUTES.IPA_LIST,
    exact: true,
    isProtect: true,
      component:()=>import('../views/IPAView.vue'),
    role: ["user", "instructor", "admin"],
    meta: {requiresAuth: true}
  },
   {
    path: ROUTES.TEST,
    exact: true,
    isProtect: true,
    component: ()=>import('../views/TestListView.vue'),
    role: ["user", "instructor", "admin"],
    meta: {requiresAuth: true}

  },
 
  {
    path:ROUTES.GAMES_HOME,
    component:()=>import('../views/PlayGames/PlayGamesView.vue'),
    meta: {requiresAuth: true}
  
  },
  {
    path:ROUTES.GAMES_CORRECT_WORD,
    component:()=>import('../views/PlayGames/CorrectWord.vue'),
    meta: {requiresAuth: true}
  },
  {
    path:ROUTES.GAMES_CORRECT_WORD_ADV, meta: {requiresAuth: true}
  },
  {
    path:ROUTES.GAMES_MILLIONAIRE, meta: {requiresAuth: true}
  },
  {
    path:ROUTES.GAMES_JIGSAW, meta: {requiresAuth: true}
  },
  {
    path:ROUTES.GAMES_FAST_GAME, meta: {requiresAuth: true}
  },
  {
    path:ROUTES.GAMES_WORD_MATCHING,
    exact: true,
    isProtect: true,
    component: () => import('@/views/WordMatchGameView.vue'),
    role: ["user", "instructor", "admin"], meta: {requiresAuth: true}
  },
  {
    path:ROUTES.GAMES_GRAMMARLY, meta: {requiresAuth: true}
  },
  {
    path:ROUTES.GAMES_VIP, meta: {requiresAuth: true}
  },
  {
    path:ROUTES.LEADERBOARD, meta: {requiresAuth: true}
  },
  {
    path:ROUTES.DICTIONARY, meta: {requiresAuth: true}
  },
  {
    path: ROUTES.ADMIN,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/index.vue'),
    role: ["instructor", "admin"],
    meta: {requiresAuth: true}
  },
  {
    path: ROUTES.WORD_ADMIN,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/WordAdmin.vue'),
    role: ["instructor", "admin"],
    meta: {requiresAuth: true}
  },
  {
    path: ROUTES.ADD_WORD,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/AddWord.vue'),
    role: ["instructor", "admin"], meta: {requiresAuth: true}
  },
  {
    path: ROUTES.LISTENING_ADMIN,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/ListeningAdminView.vue'),
    role: ["instructor", "admin"], meta: {requiresAuth: true}
  },
   {
    path: ROUTES.ADD_LISTEN,
    exact: true,
    isProtect: true,
    component:  () => import('@/views/Admin/ListeningAdminAdd.vue'),
    role: ["instructor", "admin"], meta: {requiresAuth: true}
  },

  {
    path: ROUTES.QUIZ_ADMIN,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/QuizAdmin.vue'),
    role: ["instructor", "admin"], meta: {requiresAuth: true}
  },
    {
    path: ROUTES.GRAMMAR_ADMIN,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/GrammarAdmin.vue'),
    role: ["instructor", "admin"], meta: {requiresAuth: true}
  },
   {
    path: ROUTES.CREATE_GRAMMAR,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/GrammarAdminAdd.vue'),
    role: ["instructor", "admin"], meta: {requiresAuth: true}
  },
  {
    path: ROUTES.USER_ADMIN,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/UserAdmin.vue'),
    role: ["admin"], meta: {requiresAuth: true}
  },
  {
    path: ROUTES.USER_DETAIL,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/UserDetail.vue'),
    role: ["admin"], meta: {requiresAuth: true}
  },
  {
    path: ROUTES.EDIT_USER,
    exact: true,
    isProtect: true,
    component: () =>  import('@/views/Admin/EditUser.vue'),
    role: ["admin"], meta: {requiresAuth: true}
  },
  {
    path: ROUTES.ADD_USER,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/AddUserForm.vue'),
    role: ["admin"], meta: {requiresAuth: true}
  },
  {
    path: ROUTES.EDIT_WORD,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/EditWord.vue'),
    role: ["instructor", "admin"], meta: {requiresAuth: true}
  },

  {
    path: ROUTES.EDIT_LISTEN,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/EditListening.vue'),
    role: ["instructor", "admin"], meta: {requiresAuth: true}
  },
  {
    path: ROUTES.LISTENING_DETAIL,
    exact: true,
    isProtect: true,
    component: () =>import('@/views/Admin/ListeningDetail.vue'),
    role: ["instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.QUIZ_DETAIL,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/QuizDetailView.vue'),
    role: ["instructor", "admin"],
   meta: {requiresAuth: true}
  },
  {
    path: ROUTES.CREATE_QUESTION,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/AddQuiz.vue'),
    role: ["instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.EDIT_QUESTION,
    exact: true,
    isProtect: true,
    component: () =>import('@/views/Admin/EditQuiz.vue'),
    role: ["instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.GRAMMAR_DETAIL,
    exact: true,
    isProtect: true,
    component: () => import('@/views/Admin/GrammarAdminDetail.vue'),
    role: ["instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.EDIT_GRAMMAR,
    exact: true,
    isProtect: true,
    component: () =>import('@/views/Admin/EditGrammar.vue'),
    role: ["instructor", "admin"],
    meta: {requiresAuth: true}
  },
   
  {
    path: ROUTES.GRAMMAR,
    exact: true,
    isProtect: true,
    component: () =>  import('@/views/GrammarDetailView.vue'),
    role: ["user", "instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.BLOG_ADMIN,
    exact: true,
    isProtect: true,
    component: () =>  import('@/views/Admin/BlogAdmin.vue'),
    role: ["instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.ADD_BLOG,
    exact: true,
    isProtect: true,
    component: () =>  import('@/views/Admin/AddBlog.vue'),
    role: ["instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.EDIT_BLOG,
    exact: true,
    isProtect: true,
    component: () =>  import('@/views/Admin/EditBlog.vue'),
    role: ["instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.BLOGS,
    component: () =>  import('@/views/BlogListView.vue'),
    role: ["user","instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.BLOG_DETAIL,
    component: () =>  import('@/views/Admin/BlogDetail.vue'),
    role: ["instructor", "admin"],
     meta: {requiresAuth: true}
  },
  {
    path: ROUTES.BLOG,
    component: () =>  import('@/views/BlogDetailView.vue'),
    role: ["user","instructor", "admin"],
     meta: {requiresAuth: true}
  },
  ]
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/home");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router
