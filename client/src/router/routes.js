import popcreate from '../components/popcreate'
import homeComponent from '../components/homeComponent'
import popsignup from '../components/popsignup'
import popsignin from '../components/popsignin'
import adminComponent from '../components/adminComponent'
//import dashBoard from '../components/dashBoard'

const routes = [{
        path: '/',
        name: 'home',
        component: homeComponent
    },
    {
        path: '/post',
        name: 'post',
        component: homeComponent
    },

    {
        path: '/publish',
        name: 'publish',
        component: popcreate
    },
    {
        path: '/sign-up',
        name: 'signup',
        component: popsignup    
    },
    {
        path: '/sign-in',
        name: 'signin',
        component: popsignin
    }
    ,
    // how can i secure admin route 1. admin loginpage with admin route or other way??
    {
        path: '/admin',
        name: 'admin',
        component: adminComponent
    }
];

export default routes;