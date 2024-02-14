<template>
  <VueLoading :active="isLoading"></VueLoading>
  <header class="container p-4 flex justify-between items-center">
    <h1 class="font-bold text-2xl text-center flex items-center">
      <img src="../assets/Vector.png" alt="Vector_img" class="inline-block mx-2" />
      ONLINE TODO LIST
    </h1>
    <div class="flex items-center" v-if="(token && username) === ''">
      <a href="#" class="me-3 text-gray-600 font-bold text-lg" @click.prevent="pushLogin">登入</a>
      <a href="#" class="text-red-600 font-bold text-lg" @click.prevent="pushSignup">註冊</a>
    </div>
    <div class="flex items-center" v-else>
      <h2 class="mb-0 mx-2 hidden md:block">{{ username }}的代辦</h2>
      <a href="#" class="text-red-600 font-bold text-lg" @click.prevent="logout">登出</a>
    </div>
  </header>
  <main class="container grid grid-cols-12 p-4 mx-auto" v-if="!isLoading">
    <form
      class="search-bar relative col-span-12 md:col-span-4 col-start-1 md:col-start-5"
      @submit.prevent="checkSame"
    >
      <input
        type="text"
        id="todoInput"
        class="form-control p-3"
        placeholder="新增待辦事項"
        v-model="inputTodolist"
      />
      <button type="submit" class="absolute bottom-[1px] right-1 p-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-plus-square"
          viewBox="0 0 16 16"
        >
          <path
            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"
          />
          <path
            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
          />
        </svg>
      </button>
    </form>
    <div
      class="col-span-12 md:col-span-4 col-start-1 md:col-start-5 flex flex-col items-center mt-3"
      v-if="todoList.length === 0"
    >
      <h2 class="pt-6 mt-1">目前尚無待辦事項</h2>
      <img src="../assets/empty1.png" alt="empty_img" />
    </div>
    <div class="todoList col-span-12 md:col-span-4 col-start-1 md:col-start-5" v-else>
      <div
        class="col-span-12 md:col-span-4 col-start-1 md:col-start-5 mt-4 bg-white border-0 rounded-t-lg"
      >
        <ul class="nav justify-center">
          <li
            class="options"
            v-for="(item, key) in category"
            :key="'category' + key"
            @click.prevent="changeType(item)"
            :class="{ active: filteredType === item }"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <div class="col-span-12 md:col-span-4 col-start-1 md:col-start-5 p-6 bg-white border-0">
        <ul class="px-0 list-none" v-for="item in changeTodo" :key="item.id">
          <li class="flex items-center justify-between">
            <div class="form-check flex items-center">
              <input
                type="checkbox"
                class="ms-2 me-3"
                @click.prevent="toggleTodo(item.id)"
                :checked="item.completed_at !== null ? true : false"
              />
              <label for="">{{ item.content }}</label>
            </div>
            <button type="button" @click.prevent="delTodolist(item)">X</button>
          </li>
        </ul>
      </div>
      <div
        class="col-span-12 md:col-span-4 col-start-1 md:col-start-5 bg-white flex justify-between items-center p-4 border-0 rounded-b-lg"
      >
        <div>
          <span>{{ changeTodo.length }}</span
          >個待完成項目
        </div>
        <a href="#" @click.prevent="delTodolistAll">清除已完成項目</a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, inject, computed } from 'vue'

const swal = inject('$swal')
const axios = inject('axios')
const isLoading = ref(true)
const router = useRouter()

const token = ref('')
const username = ref('')
const category = ref(['全部', '待完成', '已完成'])
const filteredType = ref('全部')
const url = import.meta.env.VITE_API
const todoList = ref([])
const inputTodolist = ref('')

const getTodo = () => {
  // 取得Todolist
  isLoading.value = false;
  axios.get(`${url}todos`).then((res) => {
    todoList.value = res.data.todos
  })
}

const addTodo = async () => {
  const addList = {
    todo: {
      content: inputTodolist.value
    }
  }
  try {
    const res = await axios.post(`${url}todos`, addList)
    swal.fire({
      icon: 'success',
      title: '新增完畢',
      text: `以新增${res.data.content}`,
      showConfirmButton: false,
      timer: 500
    })
    setTimeout(() => {
      getTodo()
    }, 500)
    inputTodolist.value = ''
  } catch (error) {
    console.log('error')
  }
}

const checkSame = () => {
  if (inputTodolist.value === '') {
    swal.fire({
      icon: 'error',
      title: '發生錯誤',
      text: '你要新增的項目不可為空 !'
    })
    return
  }
  const check = todoList.value.some((item) => item.content === inputTodolist.value.trim())
  if (check) {
    swal.fire({
      icon: 'error',
      title: '發生錯誤',
      text: '此待辦您已輸入過，請重新輸入 !'
    })
    inputTodolist.value = ''
  } else {
    addTodo()
  }
}

const toggleTodo = async (key) => {
  // 切換Todolist狀態
  try {
    isLoading.value = true;
    const res = await axios.patch(`${url}todos/${key}/toggle`)
    getTodo()
  } catch (error) {
    console.log('error')
  }
}

const delTodolist = (item) => {
  // 刪除單個todoList
  swal
    .fire({
      icon: 'warning',
      title: '刪除清單選項',
      text: `是否刪除${item.content} 這個清單!`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'DELETE!'
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${url}todos/${item.id}`).then((res) => {
          swal.fire({
            icon: 'success',
            title: `${res.data.message}成功!`
          })
          getTodo()
        })
      }
    })
}

const delTodolistAll = () => {
  const deleteItems = todoList.value
    .filter((item) => item.completed_at !== null)
    .map((item) => item.id)
  if (deleteItems.length === 0) {
    return
  }
  const deletePromises = deleteItems.map((item) => axios.delete(`${url}todos/${item}`))
  Promise.all(deletePromises).then(() => {
    getTodo()
    swal.fire({
      icon: 'success',
      title: '刪除完畢',
      showConfirmButton: false,
      timer: 1500
    })
  })
}

const initTokenRender = () => {
  if (token.value !== '') {
    axios.defaults.headers.common.Authorization = token.value
    getTodo()
  } else {
    swal.fire({
      icon: 'error',
      title: '登入錯誤',
      text: '登入時間過時或還未登入',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }
}

const pushLogin = () => {
  router.push('/')
}

const pushSignup = () => {
  router.push('/signUp')
}

const changeType = (item) => {
  filteredType.value = item
}

onMounted(() => {
  token.value = document.cookie.replace(/(?:(?:^|.*;\s*)todoToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
  username.value = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*=\s*([^;]*).*$)|^.*$/, '$1')
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
  initTokenRender()
})

const changeTodo = computed(() => {
  if (filteredType.value === '全部') {
    return todoList.value
  }
  if (filteredType.value === '待完成') {
    const toBeDone = todoList.value.filter((item) => item.completed_at === null)
    return toBeDone
  }
  const done = todoList.value.filter(
    (item) => item.completed_at !== '' && item.completed_at !== null
  )
  return done
})

const logout = () => {
  swal.fire({
    icon: 'success',
    title: '使用者登出',
    text: `感謝${username.value}的使用~`,
    showConfirmButton: false,
    timer: 1500
  })
  setTimeout(() => {
    token.value = ''
    username.value = ''
    document.cookie = 'todoToken=;  max-age=0'
    document.cookie = 'username=; max-age=0'
    pushLogin()
  }, 1500)
}
</script>
