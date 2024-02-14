<template>
  <VueLoading :active="isLoading"></VueLoading>
  <main class="container pt-5 md:pt-12">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="me-5 hidden md:block">
        <h1 class="font-bold text-2xl text-center mb-1">
          <img src="../assets/Vector.png" alt="Vector_img" class="inline-block" />
          ONLINE TODO LIST
        </h1>
        <img src="../assets/img.png" alt="Todolist_img" class="block m-auto" />
      </div>
      <div class="mx-3">
        <h2 class="text-2xl font-bold hidden md:block my-5">最實用的線上代辦事項服務</h2>
        <div class="block md:hidden text-center">
          <h2 class="text-2xl font-bold text-center">
            <img src="../assets/Vector.png" alt="Vector_img" class="inline-block" />
            ONLINE TODO LIST
          </h2>
          <h3 class="text-xl font-bold mt-3">最實用的線上代辦事項服務</h3>
        </div>
        <form class="container" @submit.prevent="login">
          <div class="pt-4">
            <label for="loginEmail" class="form-label my-3">Email</label>
            <input
              type="email"
              class="form-control h-[50px]"
              id="loginEmail"
              placeholder="請輸入Email"
              v-model="loginUserDate.user.email"
              required
            />
          </div>
          <div class="pt-4">
            <label for="loginpassword" class="form-label my-3">密碼</label>
            <input
              type="password"
              class="form-control h-[50px]"
              id="loginpassword"
              placeholder="請輸入密碼"
              v-model="loginUserDate.user.password"
              required
            />
          </div>
          <div class="flex flex-col md:flex-row mx-auto pt-5">
            <input
              class="btn w-full mt-2 md:mx-2 text-white border rounded border-red-600 bg-red-600 hover:bg-red-500 hover:border-red-500"
              id="loginBtn"
              type="submit"
              value="登入"
            />
            <input
              class="btn w-full mt-2 md:mx-2 text-white border rounded border-gray-500 bg-gray-500 hover:bg-gray-400 hover:border-gray-400"
              id="loginjoinBtn"
              type="submit"
              value="註冊帳號"
              @click.prevent="pushSignup"
            />
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { inject, ref, onMounted } from 'vue'

const isLoading = ref(true)
const router = useRouter()
const swal = inject('$swal')

const pushSignup = () => {
  router.push('/signup')
}

onMounted(() => {
  loginUserDate.value = {
    user: {
      email: '',
      password: ''
    }
  }
  setTimeout(() => {
    isLoading.value = false
  }, 500)
})

const url = import.meta.env.VITE_API
const axios = inject('axios')
const loginUserDate = ref({
  user: {
    email: '',
    password: ''
  }
})

const login = async () => {
  try {
    const res = await axios.post(`${url}users/sign_in`, loginUserDate.value);
    swal.fire({
      icon: 'success',
      title: res.data.message,
      text: `歡迎${res.data.nickname}`,
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      const token = res.headers.authorization
      const username = res.data.nickname
      document.cookie = `todoToken=${token};  max-age=1200`
      document.cookie = `username=${username}; max-age=1200`
      router.push('/todolist')
    }, 1500)
  } catch (error) {
    swal.fire({
      icon: 'error',
      title: error.response.data.message,
      text: '帳號不存在或帳號密碼錯誤'
    })
    loginUserDate.value = {
      user: {
        email: '',
        password: ''
      }
    }
  }
}
</script>
