import{_ as r,o as c,c as a,a as n,d as s,t as u,F as d}from"./index-3914fd7e.js";const{VITE_API:p,VITE_APIPATH:i}={VITE_API:"https://vue3-course-api.hexschool.io/",VITE_APIPATH:"jacky010080",BASE_URL:"/hexschool_Vue3_week7/",MODE:"production",DEV:!1,PROD:!0},l={data(){return{product:{}}},methods:{getProduct(){const{id:e}=this.$route.params;this.$http.get(`${p}/v2/api/${i}/product/${e}`).then(t=>{this.product=t.data.product}).catch(t=>{alert(t.response.data.message)})}},mounted(){this.getProduct()}},_=["src"];function h(e,t,m,P,o,V){return c(),a(d,null,[n(" 這是單一產品頁面 "),s("h2",null,u(o.product.title),1),s("img",{src:o.product.imageUrl,width:"300",alt:""},null,8,_)],64)}const E=r(l,[["render",h]]);export{E as default};
