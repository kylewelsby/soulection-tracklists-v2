import Vue from 'vue'
import Router from 'vue-router'
import Episodes from '@/components/Episodes'
import Playlists from '@/components/Playlists'
import Playlist from '@/components/Playlist'
import Episode from '@/components/Episode'
import Artist from '@/components/Artist'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  // linkActiveClass: 'active',
  linkExactActiveClass: 'active-exact',
  routes: [
    {
      path: '/',
      name: 'Episodes',
      component: Episodes
    },
    {
      path: '/playlists',
      name: 'Playlists',
      component: Playlists
    },
    {
      path: '/playlists/:id',
      name: 'Playlist',
      component: Playlist,
      props: true
    },
    {
      path: '/episodes/:number',
      name: 'Episode',
      component: Episode,
      props: (route) => {
        return {
          number: parseInt(route.params.number, 10)
        }
      }
    },
    {
      path: '/episode_:number.html',
      redirect: {
        name: 'Episode'
      }
    },
    {
      path: '/artists/:q',
      name: 'Artist',
      component: Artist,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  next()
})

export default router
