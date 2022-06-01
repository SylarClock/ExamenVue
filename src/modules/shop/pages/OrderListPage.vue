<template>
    <div class="headerPage">
        <h1>Ordenes de compra</h1>
    </div>

    <div class="container animate__animated animate__fadeInDown">
        <div class="table">
            <div class="table-head">
                <div class="col">#</div>
                <div class="col-2">Nombre</div>
                <div class="col-2">Total</div>
            </div>
            <div class="table-body">
                <div class="row" v-for="(order, index) in orders" :key="order.id">
                    <div class="col">
                        <router-link :to="'/' + order.id">#{{index +1}}</router-link>
                    </div>
                    <div class="col-2">
                        <label for="">{{order.name}}</label>
                    </div>
                    <div class="col-2">
                        <label for="">{{order.totals.total}}</label>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<script>

import apiInstance from '@/api/apiInstance'



export default ({
    name: 'OrderList',
    data(){
        return {
            orders: []
        }
    },
    methods:{
        async getOrders(){
            const {data} = await apiInstance.get("");
            this.orders = data.orders;
            console.log({data});
            localStorage.dataExam = JSON.stringify(data.orders)
            //$cookies.set("dataExam",JSON.stringify(data) )
        }
    },
    mounted(){
        
        //TODO: borra esto cuando temines las pruebas
        if(localStorage.dataExam){
            this.orders =  JSON.parse(localStorage.dataExam);
            console.log(localStorage.dataExam);
        }else{
            //console.log("no esta", this.orders);
            this.getOrders();

        }
    }
})
</script>


<style>
    
</style>