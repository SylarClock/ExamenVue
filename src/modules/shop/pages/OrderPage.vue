<template>
    <div class="headerPage">
    <h1>Orden #{{noOrder}}</h1>
    <h3 class="green animate__animated animate__heartBeat" v-if="status=='paid'">pagado</h3>
    </div>
    <div class="button-cntr"
        :class="isFold ? 'animate__animated animate__fadeOutUp':'animate__animated animate__fadeInDown' "
    >
        <button class="btn-rnd "
            v-on:click="toggleMenu"
        >
            Agregar +
        </button>
    </div>
    <div class="bg-blue"
        
        :class="isFold ? 'unfold': ''"
    >
        <div class="container form">
            <div class="row" style="margin: 10px 0">
                <h3>Agregar Articulo</h3>
            </div>
            <!-- sku, name, quantity y price, -->
            <div class="row">
                <div class="col required">
                    <label for="sku_input">SKU:</label>
                    <input type="text" id="sku_input" v-model="sku" required>
                </div>
                <div class="col-2 required">
                    <label for="name_input">Nombre:</label>
                    <input type="text" id="name_input" v-model="name" required>
                </div>
            </div>
            <div class="row">
                <div class="col-2 required">
                    <label for="sku_input">Precio:</label>
                    <input type="number" id="price_input" v-model="price" required>
                </div>
                <div class="col-2 required">
                    <label for="sku_input">Cantidad:</label>
                    <input type="number" id="quantity_input" v-model="quantity" required>
                </div>
            </div>
            <div class="row">
                <div class="col-5"></div>
                <div class="col">
                    <button class="btn-rnd" v-on:click="addToOrder">Agregar </button>
                </div>
                <div class="col">
                    <button class="btn-rnd red" v-on:click="toggleMenu">cancelar </button>
                </div>
            </div>
        </div>
    </div>
    <div class="container animate__animated animate__fadeInDown">
        <div class="table">
            <div class="table-head">
                <div class="col">#</div>
                <div class="col-2">SKU</div>
                <div class="col-2">Nombre</div>
                <div class="col-2">Cantidad</div>
                <div class="col-2">Precio</div>
            </div>
            <div class="table-body">
                <div class="row" v-for="(item, index) in selected.items" :key="item.id">
                    <div class="col">
                        <router-link :to="'/' + items.id">#{{index +1}}</router-link>
                    </div>
                    <div class="col-2">
                        <label for="">{{item.sku}}</label>
                    </div>
                    <div class="col-2">
                        <label for="">{{item.name}}</label>
                    </div>
                    <div class="col-2">
                        <label for="">{{item.quantity}}</label>
                    </div>
                    <div class="col-2">
                        <label for="">{{item.price}}</label>
                    </div>
                </div>

            </div>
            <div class="table-footer">
                <div class="row">
                    <div class="col-2 text-left total-cnt">
                        <h5 class="subtotal">Subtotal: $ {{subTotal}}</h5>
                        <h2 class="total">Total: $ {{total}}</h2>
                    </div>
                    <div class="col-5"></div>
                    <div class="col pay-container" v-if="status !='paid'">
                        <button class="btn-rnd" v-on:click="payOrder">Pagar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data(){
        return {
            id: "",
            noOrder: "",
            selected: Object,
            items: [],
            isFold: false,
            sku: "",
            name: "",
            price: 0,
            quantity: 0,
            status:"",
            subTotal: "",
            total: ""
        }
    },
    methods:{
        setItems(){
            const t_id = this.$route.params.id;
            //todo: busca la cookie con esa id
            const orederArr = JSON.parse(localStorage.dataExam);

            const selected = orederArr.find((order)=>order.id == t_id);
            this.selected = selected;
            this.id = t_id;
            this.items = selected.items;
            this.noOrder = selected.number;
            this.status = selected.status.status;
            this.subTotal = selected.totals.subtotal;
            this.total = selected.totals.total;
            console.log("items", this.items);
        },
        toggleMenu(){
            this.isFold = !this.isFold;
        },
        addToOrder(){

            if(
                this.sku.length > 0 &&
                this.name.length > 0 &&
                this.price > 0 &&
                this.quantity > 0 
            ){
                this.selected.items.push({
                    id: Date.now(),
                    sku: this.sku,
                    name: this.name,
                    price: this.price,
                    quantity: this.quantity
                });
                const orederArr = JSON.parse(localStorage.dataExam);
    
                const newArr = orederArr.map((order)=>{
                    if(order.id == this.id ){
                        debugger;
                        order.items = this.selected.items;
                        const subTotal =  Number(order.totals.subtotal);
                        const priceSub = subTotal + (this.price * this.quantity);
                        order.totals.subTotal = "" + priceSub;
                        order.totals.total =  parseFloat( (priceSub +  Number(order.totals.tax)) ).toFixed(2).toString();
                         order.status.status = "any";
                        return order;
                    }else{
                        return order;
                    }
                });
                
                localStorage.dataExam = JSON.stringify(newArr);
                this.setItems();
                this.toggleMenu();
            }

        },
        payOrder(){
            const orederArr = JSON.parse(localStorage.dataExam);
    
            const newArr = orederArr.map((order)=>{
                if(order.id == this.id ){
                    order.status.status = "paid";
                    return order;
                }else{
                    return order;
                }
            });
            this.status = "paid"
            localStorage.dataExam = JSON.stringify(newArr);

        }
    },
    mounted(){
        this.setItems();
        
    }

}
</script>

<style scoped>
    .pay-container{
        align-items: center;
        display: flex;
    }
    .text-left{
        text-align: left;
    }
    .button-cntr{
        display: flex;
        padding: 0 48px;
        margin-bottom: 10px;
    }
    .addBtn{
        color: #fff;
    }
    .btn-rnd{
        color: #fff;
        height: 48px;
        font-size: 14px;
        padding: 0 30px;
        border-radius: 10px;
        background: #00aab0;
        border-color: transparent;
        border-width: 1px;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        cursor: pointer;
    }
    .total-cnt{
        color: #686868;
    }
    .table-body{
        min-height: 250px;
    }
    .red{
        background: #b00f00;
    }
    .green{
        color: aqua;
    }
    .subtotal{
        margin-bottom: 5px;
    }
    .total{
        margin-top: 7px;
    }
    .bg-blue{
        background: rgb(11,168,127);
        background: linear-gradient(317deg, rgba(11,168,127,1) 0%, rgba(0,212,255,1) 100%);
        height: 0;
        padding: 0;
        margin: 0;
        overflow: hidden;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
    }
    
    .bg-blue.unfold{
        height: 650px;
        margin-bottom: 50px;
        padding-top: 50px;
    }
    .form{
        min-height: 430px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        display: block;
        padding: 25px 35px 0 35px;
    }
    .table-footer{
        margin-top: 50px;
    }
    .btn-rnd:hover{
        color:#00aab0;
        background: #fff;
        border-color: #00aab0;
    }
    .red:hover{
        color:#b00f00;
        background: #fff;
        border-color: #b00f00;
    }
    .col{
        flex: 1;
    }
    .col-2{
        flex: 2;
    }
    .col-5{
        flex: 5;
    }
    .row{
        display: flex;
    }

    .form .row{
        margin: 35px 0;
    }
    .required{
        text-align: left;
        display: block;
        padding: 0 15px;
    }
    .required label{
        font-weight: bold;
    }
    .required input{
        width: 100%;
        margin-top: 15px;
        height: 55px;
        border-radius: 8px;
        height: 55px;
        border-color: #e1e1e1;
        border-top-width: 0;
        border-top-right-radius: 0;
        border-left-width: 0;
    }

</style>