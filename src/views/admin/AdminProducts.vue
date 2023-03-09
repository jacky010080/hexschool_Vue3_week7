<template>
  後台產品列表
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td>
            <span class="text-success" v-if="product.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <pagination :pages="page" :get-data="getData"></pagination> -->
    </div>
    <!-- 新增||編輯Modal -->
    <ProductModal
    ref="productModal"
    :is-new="isNew"
    :product="tempProduct"
    @update-product="updateProduct">
    </ProductModal>
    <!-- 刪除商品Modal -->
    <DeleteModal
    ref="delModal"
    :product="tempProduct"
    @del-product="deleteProduct">
    </DeleteModal>
</template>

<script>
import ProductModal from '../../components/ProductModal.vue'
import DeleteModal from '../../components/DeleteModal.vue'
const { VITE_API, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: []
      },
      page: {}
    }
  },
  components: {
    ProductModal,
    DeleteModal
  },
  methods: {
    // 將資料庫中的資料丟進data
    getData (page = 1) {
      this.$http
        .get(`${VITE_API}/v2/api/${VITE_APIPATH}/admin/products/?page=${page}`)
        .then((res) => {
          this.products = res.data.products
          this.page = res.data.pagination
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    openModal (isNew, product) {
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.productModal.modal.show()
      } else if (isNew === 'edit') {
        this.tempProduct = { ...product }
        this.isNew = false
        this.$refs.productModal.modal.show()
      } else if (isNew === 'delete') {
        this.tempProduct = { ...product }
        this.$refs.delModal.modal.show()
      }
    },
    createImages () {
      this.tempProduct.imagesUrl = []
      this.tempProduct.imagesUrl.push('')
    },
    updateProduct () {
      let http = 'post'
      let apiUrl = `${VITE_API}/v2/api/${VITE_APIPATH}/admin/product`
      if (!this.isNew) {
        http = 'put'
        apiUrl = `${VITE_API}/v2/api/${VITE_APIPATH}/admin/product/${this.tempProduct.id}`
      }
      // 根據商品是否為新商品，分別串接對應api
      this.$http[http](apiUrl, {
        data: this.tempProduct
      })
        .then((res) => {
          alert(res.data.message)
          this.$refs.productModal.modal.hide() // 關閉Modal互動視窗
          this.getData() // 重新取得商品資料
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // 刪除單筆商品
    deleteProduct () {
      this.$http
        .delete(
          `${VITE_API}/v2/api/${VITE_APIPATH}/admin/product/${this.tempProduct.id}`
        )
        .then((res) => {
          alert(res.data.message)
          this.$refs.delModal.modal.hide()
          this.getData() // 重新取得商品資料
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>