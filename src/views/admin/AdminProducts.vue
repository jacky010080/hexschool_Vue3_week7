<template>
  <div class="container">
    <LoadingView v-model:active="isLoading"></LoadingView>
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
                class="btn btn-outline-warning btn-sm"
                @click="openModal('delete', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationView :pages="page" @emit-page="getData"></PaginationView>
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
    :item="tempProduct"
    @delete="deleteProduct">
    </DeleteModal>
</template>

<script>
import ProductModal from '../../components/ProductModal.vue'
import DeleteModal from '../../components/DeleteModal.vue'
import PaginationView from '../../components/PaginationView.vue'
import Swal from 'sweetalert2'
const { VITE_API, VITE_APIPATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: []
      },
      page: {},
      isLoading: false
    }
  },
  components: {
    ProductModal,
    DeleteModal,
    PaginationView
  },
  methods: {
    getData (page = 1) {
      const url = `${VITE_API}/v2/api/${VITE_APIPATH}/admin/products/?page=${page}`
      this.isLoading = true
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false
          this.products = res.data.products
          this.page = res.data.pagination
        })
        .catch((err) => {
          this.isLoading = false
          Swal.fire({
            icon: 'error',
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: 'OK'
          })
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
      let url = `${VITE_API}/v2/api/${VITE_APIPATH}/admin/product`
      this.isLoading = true
      if (!this.isNew) {
        http = 'put'
        url = `${VITE_API}/v2/api/${VITE_APIPATH}/admin/product/${this.tempProduct.id}`
      }
      this.$http[http](url, {
        data: this.tempProduct
      })
        .then((res) => {
          this.isLoading = false
          this.getData()
          this.$refs.productModal.modal.hide()
          if (!this.isNew) {
            Swal.fire({
              icon: 'success',
              title: res.data.message,
              confirmButtonText: 'OK'
            })
          }
        })
        .catch((err) => {
          this.isLoading = false
          Swal.fire({
            icon: 'error',
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: 'OK'
          })
        })
    },
    deleteProduct () {
      const url = `${VITE_API}/v2/api/${VITE_APIPATH}/admin/product/${this.tempProduct.id}`
      this.isLoading = true
      this.$http.delete(url)
        .then((res) => {
          this.isLoading = false
          this.$refs.delModal.modal.hide()
          this.getData()
          Swal.fire({
            icon: 'success',
            title: res.data.message,
            confirmButtonText: 'OK'
          })
        })
        .catch((err) => {
          this.isLoading = false
          Swal.fire({
            icon: 'error',
            title: `錯誤 ${err.response.status}`,
            text: err.response.data.message,
            confirmButtonText: 'OK'
          })
        })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
