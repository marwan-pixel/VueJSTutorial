<template>
    <nav class="navbar navbar-light fixed-top">
        <div class="navbar-text ms-auto d-flex ">
            <button class="btn btn-sm btn-outline-success" @click="$emit('toggle-slide')">
                <FontAwesomeIcon icon="dollar-sign"></FontAwesomeIcon>
            </button>
            <div class="ms-2 dropdown" v-if="cart.length > 0">
                <button class="btn btn-success btn-sm dropdown-toggle" id="dropdownCart" data-bs-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    <span class="badge rounded-pill text-bg-success">{{ cartQty }}</span>
                    <FontAwesomeIcon icon="shopping-cart"></FontAwesomeIcon>
                    <PriceVue :value="Number(cartTotal)"></PriceVue>
                </button>
                <div class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownCart">
                    <div v-for="(item, index) in cart" :key="index">
                        <div class="dropdown-item-text text-nowrap text-end">
                            <span class="badge rounded-pill text-bg-warning align-text-top me-2">
                                {{ item.qty }}
                            </span>
                            {{ item.product.name }}
                            <b>{{ currencyFormat[index] }}</b>
                            <a href="#" class="badge text-bg-danger" @click.stop="$emit('delete-item', index)">-</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import PriceVue from './PriceVue.vue';
export default {
    name: 'navbar-vue',
    components: {
    PriceVue,
    FontAwesomeIcon,
},
    props: ["cart", "cartQty", "cartTotal"],
    methods: {
        currencyFormat: function () {
            return this.cart.map(item => `Rp${Number.parseFloat(item.product.price * item.qty).toFixed(2)}`);
        }
    },
}
</script>