<template>
  <VueLoading :active="isLoading"></VueLoading>
  <main class="container pt-5 md:pt-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="me-5 md:pt-5 hidden md:block">
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
        <form class="container" @submit.prevent="signUp">
          <div class="pt-2">
            <label for="registrationEmail" class="form-label my-3">Email</label>
            <input
              type="email"
              class="form-control h-[50px]"
              id="registrationEmail"
              placeholder="請輸入Email"
              v-model="registrationData.user.email"
              required
            />
          </div>
          <div class="pt-2">
            <label for="registrationname" class="form-label my-3">您的暱稱</label>
            <input
              type="text"
              class="form-control h-[50px]"
              id="registrationname"
              placeholder="請輸入您的暱稱"
              v-model="registrationData.user.nickname"
              required
            />
          </div>
          <div class="pt-2">
            <label for="registrationpassword" class="form-label my-3">密碼</label>
            <input
              type="password"
              class="form-control h-[50px]"
              id="registrationpassword"
              placeholder="請輸入密碼"
              v-model="registrationData.user.password"
              required
            />
          </div>
          <div class="pt-2">
            <label for="passwordConfirm" class="form-label my-3">再次輸入密碼</label>
            <input
              type="password"
              class="form-control h-[50px]"
              id="passwordConfirm"
              placeholder="請再次輸入密碼"
              v-model="passwordAgain"
              required
            />
          </div>
          <div class="flex flex-col md:flex-row mx-auto pt-5">
            <input
              class="btn w-full mt-2 md:mx-2 text-white border rounded border-red-600 bg-red-600 hover:bg-red-500 hover:border-red-500"
              id="registrationBtn"
              type="submit"
              value="註冊帳號"
            />
            <input
              class="btn w-full mt-2 md:mx-2 text-white border rounded border-gray-500 bg-gray-500 hover:bg-gray-400 hover:border-gray-400"
              id="registrationloginBtn"
              type="submit"
              value="登入"
              @click.prevent="pushLogin"
            />
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, inject, onMounted } from 'vue'

const swal = inject('$swal')
const router = useRouter()
const isLoading = ref(true)
const pushLogin =() => {
  router.push('/')
}
const url = import.meta.env.VITE_API
const axios = inject('axios')

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
})

const registrationData = ref({
  user: {
    email: '',
    nickname: '',
    password: ''
  }
});
const passwordAgain = ref('');


const signUp = async () => {
  if (passwordAgain.value !== registrationData.value.user.password) {
    swal.fire({
      icon: 'error',
      title: '註冊錯誤',
      text: '註冊密碼不同'
    })
  } else {
    try {
      const res = await axios.post(`${url}users`, registrationData.value)
      swal.fire({
        icon: 'success',
        title: res.data.message,
        text: `帳號名稱:${res.data.nickname}，註冊成功，並於3秒後返回登入頁面!`,
        showConfirmButton: false,
        timer: 3000
      })
      setTimeout(() => {
        pushLogin()
      }, 3000)
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: error.response.data.message,
        text: error.response.data.error[0]
      })
    }
  }
  registrationData.value = {
    user: {
      email: '',
      nickname: '',
      password: ''
    }
  }
  passwordAgain.value = ''
}
</script>
