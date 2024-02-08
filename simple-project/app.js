// var dataProduct = {
//     maximum: 500,
//     products: [
//         {
//             name: "Xiaomi 13 Ultra",
//             description: "Xiaomi Ultra Flagship Smartphone",
//             price: '849.50',
//             image: 'https://www.androidauthority.com/wp-content/uploads/2023/04/Xiaomi-13-Ultra-white-model-resize-840w-472h.jpg.webp'
//         },
//         {
//             name: "Xiaomi 13 Pro",
//             description: "Xiaomi Flagship Smartphone",
//             price: '1149.99',
//             image: 'https://cdn.dxomark.com/wp-content/uploads/medias/post-139229/Xiaomi-13-Pro_featured-image-packshot-review-Recovered.jpg'
//         },
//         {
//             name: "Xiaomi 13",
//             description: "Xiaomi Compact Flagship Smartphone",
//             price: '663.14',
//             image: 'https://www.phoneworld.com.pk/wp-content/uploads/2023/04/xiaomi-13T-Pro-Specs.jpg'
//         },
//         {
//             name: "Xiaomi 13 Lite",
//             description: "Xiaomi Midrange Smartphone",
//             price: '324.99',
//             image: 'https://gizchina.it/wp-content/uploads/2022/10/Xiaomi-13-lite-civi-2.jpg'
//         },
//     ]
// };

Vue.component('price', {
    data: function () {
        return {}
    },
    props: {
        'value': Number,
        'prefix': {
            type: String,
            default: 'Rp'
        },
        precision: {
            type: Number,
            default: 2
        }
    },
    template: `<span>{{ this.prefix + Number.parseFloat(this.value).toFixed(this.precision) }} </span>`
});

Vue.component('product-list', {
    props: ['products', 'maximum'],
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
    template: `
    <transition-group name="fade" tag="div" @beforeEnter="before" @enter="enter" @leave="leave">
        <div class="row d-none mb-3 align-items-center" v-for="(item, index) in products" :key="item.id"
            v-if="item.price <= Number(maximum)" :data-index="index">
            <div class="col-1 m-auto">
                <button class="btn btn-info text-white" @click.stop="$emit('add', item)">+</button>
            </div>
            <div class="col-sm-4">
                <img class="img-fluid d-block" :src="item.image" :alt="item.name">
                <!-- <img v-bind="{
                    class: imgClass,
                    src: item.image,
                    alt: item.name
                }"> -->
            </div>
            <div class="col">
                <h3 class="text-dark fw-bold">{{ item.name }}</h3>
                <p class="mb-0S">{{ item.description }}</p>
                <div class="h5 float-right">
                    <price 
                        :value="Number(item.price)"
                        :prefix="'Rp'" 
                        :precision="2"
                    ></price>
                </div>
            </div>
        </div>

    </transition-group>
    `
});

var app = new Vue({
    el: '#app',
    data: {
        imgClass: 'img-fluid',
        maximum: 50,
        products: null,
        cart: [],
        style: {
            label: ['font-weight-bold', 'mr-2'],
            inputWidth: 60,
            sliderStatus: false
        },
        name: 'Hello World',
        slugText: 'The Quick #(*!&@ Brown 29'
    },
    mounted: function () {
        fetch('https://hplussport.com/api/products/order/price')
            .then(response => response.json())
            .then(data => {
                this.products = data;
            })
    },
    computed: {
        now: function () {
            var date = new Date();
            return (
                String(date.getHours()) +
                String(date.getMinutes()) +
                String(date.getSeconds())
            );
        },
        slugetize: function () {
            return this.slugText
                .toLowerCase()
                .replace(/[^\w]+/g, '')
                .replace(/ +/g, '-') + '-' + this.now();
        },
        sliderState: function () {
            return this.style.sliderStatus ? 'd-flex' : 'd-none';
        },
        cartTotal: function () {
            let sum = 0;
            for (key in this.cart) {
                sum = sum + (this.cart[key].product.price * this.cart[key].qty);
            }
            return sum;
        },
        cartQty: function () {
            let qty = 0;
            for (key in this.cart) {
                qty = qty + this.cart[key].qty
            }
            return qty;
        }
    },
    filters: {
        currencyFormat: function (value) {
            return `Rp${Number.parseFloat(value).toFixed(2)}`;
        }
    },
    methods: {
       
        addItem: function (product) {
            var productIndex;
            var productExist = this.cart.filter(function (item, index) {
                if (item.product.id == Number(product.id)) {
                    productIndex = index;
                    return true;
                } else {
                    return false;
                }
            });
            if (productExist.length) {
                this.cart[productIndex].qty++;
            } else {
                this.cart.push({ product: product, qty: 1 });
            }
        },
        deleteItem: function (key) {
            if (this.cart[key].qty > 1) {
                this.cart[key].qty--;
            } else {
                this.cart.splice(key, 1);
            }
        }
    }
});