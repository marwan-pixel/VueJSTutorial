<template>
    <div>
        <h1>IDShop</h1>
        <navbar-vue :cart="cart" :cartQty="cartQty" :cartTotal="cartTotal" @toggle-slide="toggleSlider"
            @delete-item="deleteItem"></navbar-vue>
        <price-slider :sliderStatus="sliderStatus" :maximum="maximum" @input="updateMaximum"></price-slider>
        <product-list :products="products" :maximum="maximum" @add-item="addItem"></product-list>
    </div>
</template>

<script>
import NavbarVue from './NavbarVue.vue';
import ProductList from './ProductList.vue';
import PriceSlider from './PriceSlider.vue';

export default {
    name: "products-vue",
    props: [
        "products",
        "maximum",
        "cart",
        "cartQty",
        "cartTotal",
        "sliderStatus",
        "sliderState"
    ],
    components: {
        NavbarVue, PriceSlider, ProductList
    },
    methods: {
        toggleSlider: function() {
            this.$emit('toggle');
        },
        addItem: function(item){
            this.$emit('add', item);
        },
        deleteItem: function(item) {
            this.$emit('delete', item);
        },
        updateMaximum: function(newMaximum) {
            this.$emit('update:maximum', newMaximum);
        }
    }
}
</script>
