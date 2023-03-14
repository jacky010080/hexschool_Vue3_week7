import{_ as m,o as c,c as r,a as _,d as t,F as h,f as g,g as I,t as l,h as f,v as x}from"./index-e9c23ee6.js";const{VITE_API:i,VITE_APIPATH:u}={VITE_API:"https://vue3-course-api.hexschool.io/",VITE_APIPATH:"jacky010080",BASE_URL:"/hexschool_Vue3_main_week6/",MODE:"production",DEV:!1,PROD:!0},y={data(){return{products:[],productId:"",cart:{},loadingItem:"",form:{user:{name:"",email:"",tel:"",address:""},message:""}}},methods:{getCart(){this.$http.get(`${i}/v2/api/${u}/cart`).then(e=>{this.cart=e.data.data}).catch(e=>{alert(e.response.data.message)})},updateProductQty(e){const o={product_id:e.product.id,qty:e.qty};this.loadingItem=e.id,this.$http.put(`${i}/v2/api/${u}/cart/${e.id}`,{data:o}).then(n=>{alert(n.data.message),this.getCart(),this.loadingItem=""}).catch(n=>{alert(n.response.data.message),this.loadingItem=""})},deleteProduct(e){this.loadingItem=e.id,this.$http.delete(`${i}/v2/api/${u}/cart/${e.id}`).then(o=>{alert(o.data.message),this.getCart(),this.loadingItem=""}).catch(o=>{alert(o.response.data.message)})},deleteAllProduct(){this.$http.delete(`${i}/v2/api/${u}/carts`).then(e=>{alert(e.data.message),this.getCart()}).catch(e=>{alert(e.response.data.message)})}},mounted(){this.getCart()}},v={class:"table align-middle"},b=t("thead",null,[t("tr",null,[t("th"),t("th",null,"品名"),t("th",{style:{width:"150px"}},"數量/單位"),t("th",null,"單價")])],-1),P=["onClick","disabled"],V=t("i",{class:"fas fa-spinner fa-pulse"},null,-1),$={class:"input-group input-group-sm"},C=["onUpdate:modelValue","onChange","disabled"],k=["value"],A={class:"text-end"},E=t("td",{colspan:"3",class:"text-end"},"總計",-1),T={class:"text-end"},D=t("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),q={class:"text-end text-success"};function w(e,o,n,B,d,p){return c(),r(h,null,[_(" 這是購物車頁面 "),t("table",v,[b,t("tbody",null,[d.cart.carts?(c(!0),r(h,{key:0},g(d.cart.carts,s=>(c(),r("tr",{key:s.id},[t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:a=>p.deleteProduct(s),disabled:s.id===d.loadingItem},[V,_(" x ")],8,P)]),t("td",null,l(s.product.title),1),t("td",null,[t("div",$,[f(t("select",{name:"",id:"",class:"form-control","onUpdate:modelValue":a=>s.qty=a,onChange:a=>p.updateProductQty(s),disabled:s.id===d.loadingItem},[(c(),r(h,null,g(20,a=>t("option",{value:a,key:"cart"+a},l(a),9,k)),64))],40,C),[[x,s.qty]])])]),t("td",A,l(s.total),1)]))),128)):I("",!0)]),t("tfoot",null,[t("tr",null,[E,t("td",T,l(d.cart.total),1)]),t("tr",null,[D,t("td",q,l(d.cart.final_total),1)])])])],64)}const S=m(y,[["render",w]]);export{S as default};
