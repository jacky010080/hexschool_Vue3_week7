import{_ as h,e as m,r as g,o as a,c as n,a as c,d as t,F as l,f as b,t as k,b as P,w as V}from"./index-3914fd7e.js";const{VITE_API:d,VITE_APIPATH:i}={VITE_API:"https://vue3-course-api.hexschool.io/",VITE_APIPATH:"jacky010080",BASE_URL:"/hexschool_Vue3_week7/",MODE:"production",DEV:!1,PROD:!0},$={data(){return{products:[]}},components:{RouterLink:m},methods:{getProducts(){this.$http.get(`${d}/v2/api/${i}/products/all`).then(e=>{this.products=e.data.products}).catch(e=>{alert(e.response.data.message)})},addToCart(e){const r={product_id:e,qty:1};this.$http.post(`${d}/v2/api/${i}/cart`,{data:r}).then(s=>{alert(s.data.message),console.log(s)}).catch(s=>{alert(s.response.data.message)})}},mounted(){this.getProducts()}},f={class:"table"},T=["src"],y=["onClick"];function E(e,r,s,I,u,_){const p=g("router-link");return a(),n(l,null,[c(" 這是產品列表頁面 "),t("table",f,[t("tbody",null,[(a(!0),n(l,null,b(u.products,o=>(a(),n("tr",{key:o.id},[t("td",null,k(o.title),1),t("td",null,[t("img",{src:o.imageUrl,width:"200",alt:""},null,8,T)]),t("td",null,[P(p,{to:`/product/${o.id}`,class:"btn btn-outline-secondary"},{default:V(()=>[c("商品細節")]),_:2},1032,["to"]),t("button",{type:"button",class:"btn btn-outline-primary",onClick:x=>_.addToCart(o.id)},"加入購物車",8,y)])]))),128))])])],64)}const C=h($,[["render",E]]);export{C as default};