<template>
    <transition name="custom-classes" enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__slideOutRight">
        <div v-if="sliderStatus">
            <div class="align-items-center" :class="sliderState">
                <label for="" class="font-weight-bold me-2">Max</label>
                <input type="number" class="form-control mx-2" style="width: 60px; text-align: center;" v-model="maxAmount" @input="updateMaximum">
                <input type="range" class="custom-range" min="0" max="50" v-model="maxAmount" @input="updateMaximum">
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'price-slider',
    data: function () {
        return {
            maxAmount: 50
        }
    },
    props: ['sliderStatus', 'maximum'],
    computed: {
        sliderState: function () {
            return this.sliderStatus ? 'd-flex' : 'd-none';
        },
    },
    methods: {
        updateMaximum: function() {
            this.$emit('update:maximum', this.maxAmount);
        }
    }
}
</script>

<style>
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s ease-in-out;
}
</style>
