<template>
    <div>
        <h1>Checkout</h1>
        <table class="table table-hover" v-if="cart.length">
            <caption class="text-end h3">
                <b>Total:</b>
                <PriceVue class="d-block text-success font-weight-light" :value="Number(cartTotal)"></PriceVue>
            </caption>
            <thead>
                <tr >
                    <th scope="col"></th>
                    <th scope="col">item</th>
                    <th scope="col" class="text-center">Qty</th>
                    <th scope="col" class="text-right">Price</th>
                    <th scope="col" class="text-right">Sub-total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in cart" :key="item.product.id">
                    <td class="text-center">
                        <div class="btn-group">
                            <button @click="$emit('add', item.product)" class="btn btn-info">+</button>
                            <button @click="$emit('delete', index)" class="btn btn-outline-info">-</button>
                        </div>
                    </td>
                    <th scope="row">{{ item.product.name }}</th>
                    <th class="text-center">{{ item.qty }}</th>
                    <th class="text-right">{{ Number(item.product.price) }}</th>
                    <th class="text-right">
                        {{ Number(item.product.price * item.qty) }}
                    </th>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import PriceVue from './PriceVue.vue';

export default {
    name: 'checkout-vue',
    props: ["cart", "cartTotal"],
    components: {
        PriceVue
    }
}
</script>