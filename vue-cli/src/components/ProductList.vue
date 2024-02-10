<template>
    <transition-group name="fade" tag="div" @beforeEnter="before" @enter="enter" @leave="leave">
        <div class="row d-none mb-3 align-items-center" v-for="(item, index) in showItem" :key="item.id"
            :data-index="index">
            <div class="col-1 m-auto">
                <button class="btn btn-info text-white" @click.stop="$emit('add-item', item)">+</button>
            </div>
            <div class="col-sm-4">
                <img class="img-fluid d-block" :src="item.image" :alt="item.name">
            </div>
            <div class="col">
                <h3 class="text-dark fw-bold">{{ item.name }}</h3>
                <p class="mb-0S">{{ item.description }}</p>
                <div class="h5 float-right">
                    <PriceVue :value="Number(item.price)"></PriceVue>
                </div>
            </div>
        </div>

    </transition-group>
</template>

<script>
import PriceVue from './PriceVue.vue';

export default {
    name: "product-list",
    components: {
        PriceVue
    },
    props: ["products", "maximum"],
    computed: {
        showItem: function() {
            let max = this.maximum;
            return this.products.filter((item) => item.price <= max);
        }
    },
    methods: {
        before: function (el) {
            el.className = 'd-none';
        },
        enter: function (el) {
            var delay = el.dataset.index * 100;
            setTimeout(function () {
                el.className = 'row d-flex mb-3 align-items-center animate__animated animate__fadeInRight';
            }, delay);
        },
        leave: function (el) {
            var delay = el.dataset.index * 100;
            setTimeout(function () {
                el.className = 'row d-flex mb-3 align-items-center animate__animated animate__fadeOutRight';
            }, delay);
        },
    },

}
</script>