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

var app = new Vue({
    el: '#app',
    data: {
        maximum: 50,
        products: null
    },
    mounted: function() {
        fetch('https://hplussport.com/api/products/order/price')
        .then(response => response.json())
        .then(data => {
            this.products = data;
        })
    }
});