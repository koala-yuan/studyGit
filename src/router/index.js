import Vue from 'vue'
import Router from 'vue-router'

import HomeContainer from '@/components/tabbar/HomeContainer'
import MemberContainer from '@/components/tabbar/MemberContainer'
import SearchContainer from '@/components/tabbar/SearchContainer'
import ShopcarContainer from '@/components/tabbar/ShopcarContainer'
import NewList from '@/components/news/NewList'
import NewsInfo from '@/components/news/NewsInfo'
import PhotoList from '@/components/photos/PhotoList'
import PhotoInfo from '@/components/photos/PhotoInfo'
import GoodsList from '@/components/goods/GoodsList'
import GoodsInfo from '@/components/goods/GoodsInfo'
import Getdesc from '@/components/goods/Getdesc'
import GoodsComment from '@/components/goods/GoodsComment'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/home',
    name: 'HomeContainer',
    component: HomeContainer
  }, {
    path: '/member',
    name: 'MemberContainer',
    component: MemberContainer
  }, {
    path: '/search',
    name: 'SearchContainer',
    component: SearchContainer
  }, {
    path: '/shopcar',
    name: 'ShopcarContainer',
    component: ShopcarContainer
  }, {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home/newList',
    name: 'NewList',
    component: NewList
  }, {
    path: '/home/newsInfo',
    name: 'NewsInfo',
    component: NewsInfo
  }, {
    path: '/home/photolist',
    name: 'PhotoList',
    component: PhotoList
  }, {
    path: '/home/photoInfo',
    name: 'PhotoInfo',
    component: PhotoInfo
  }, {
    path: '/home/goodslist',
    name: 'GoodsList',
    component: GoodsList
  }, {
    path: '/home/goodsinfo/:id',
    name: 'GoodsInfo',
    component: GoodsInfo
  }, {
    path: '/home/getdesc/:id',
    name: 'Getdesc',
    component: Getdesc
  }, {
    path: '/home/goodscomment/:id',
    name: 'GoodsComment',
    component: GoodsComment
  }],
  linkActiveClass: 'mui-active'
})
