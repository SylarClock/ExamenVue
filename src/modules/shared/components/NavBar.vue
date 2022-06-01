<template>
    <div class="navbar">
       <div class="container-nav">
           <div class="main-icon">
               <router-link to="/">
                    <img src="@/assets/celtsTree.png" alt="">
               </router-link>
           </div>
           <div class="navigation">
               <!-- <ul>
                   <li>
                       <router-link to="/">Regresar</router-link>
                   </li>
                   <li>
                       <router-link to="/item/id">/item/id</router-link>
                   </li>
                   <li>
                       <router-link to="/id">/id</router-link>
                   </li>
                   <li>
                       <router-link to="/asdasdas">OrderListPage</router-link>
                   </li>
               </ul> -->
           </div>
       </div>
    </div>
</template>



<style scoped>
    .navbar{
        position: fixed;
        top:0;
        width: 100%;
        z-index: 900;
        box-shadow: 0 8px 20px 0 rgb(0 0 0 / 10%);
        /* background-color: #fff; */
        background: rgb(146,243,238);
    }
    .container-nav{
        display: flex;
        padding: 5px;
    }
    .main-icon{
        flex: 3;
    }
    .main-icon img{
        width: 50px;
        height: 50px;
    }
    .navigation{
        flex: 17;
        
    }
    .navigation ul{
        align-self: center;
        display: flex;
        justify-content: right;
    }
    .navigation ul li{
        flex: 1;
    }
</style>