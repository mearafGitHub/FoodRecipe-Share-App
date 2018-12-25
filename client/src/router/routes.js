import profile from '../components/profile'
import homeComponent from '../components/homeComponent'
import popsignup from '../components/popsignup'
//import popsignin from '../components/popsignin'
import postComponent from '../components/postComponent'
//   function redirect(to, from, next) {
//         if(localStorage.token ){
//               next('/profile');
//           }
//            else{
//                 next();
//             }
//        } 

//        function isSignedIn(to, from, next) {
//         if(localStorage.token ){
//               next('/publish');
//         }
//           else{
//                 next('/home');
//             }
//        } 

const routes = [{
        path: '/',
        name: 'home',
        component: homeComponent
    },
    {
        path: '/post',
        name: 'post',
        component: postComponent
    },
    {
        path: '/sign-up',
        name: 'signup',
        component: popsignup,
        //beforeRouteEnter:  redirect()
    },
    {
        path: '/profile',
        name: 'profile',
        component: profile,
        //beforeRouteEnter: isSignedIn()
    }
        
];

export default routes;