<template>
  <NavBar></NavBar>
  <router-view />
</template>

<script>

import { defineAsyncComponent } from 'vue';


export default {
  name: 'App',
  components: {
    NavBar: defineAsyncComponent(()=>import(/*webpackChunkName: "NavBar"*/'@/modules/shared/components/NavBar'))
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
}
ul{
  list-style: none;
}
.headerPage{
    height: 150px;
    padding: 25px;
}
.headerPage h1{
    margin-top: 50px
}
</style>
