<template>
  <div class="login-bg">
    <div class="login-bg-blur"></div>
    <div class="login-card">
      <div class="login-logo-area">
        <div class="login-title">登录</div>
      </div>
      <form class="login-form" @submit.prevent="onLogin">
        <div class="form-group">
          <span class="input-icon">👤</span>
          <input v-model="username" type="text" placeholder="用户名" autocomplete="username" required />
        </div>
        <div class="form-group">
          <span class="input-icon">🔒</span>
          <input v-model="password" type="password" placeholder="密码" autocomplete="current-password" required />
        </div>
        <button class="login-btn" :disabled="loading">{{ loading ? '登录中...' : '登录' }}</button>
        <div v-if="error" class="login-error">{{ error }}</div>
      </form>
      <div class="login-footer">© 2024 登录</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

function onLogin() {
  error.value = ''
  loading.value = true
  setTimeout(() => {
    if (username.value === 'admin' && password.value === '123456') {
      router.push('/main/menu')
    } else {
      error.value = '用户名或密码错误（admin/123456）'
    }
    loading.value = false
  }, 1000)
}
</script>

<style>
html, body {
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}
body {
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}
.login-bg {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  max-height: 100vh;
  background: linear-gradient(120deg, #e0e7ff 0%, #f5f7fa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;
  overflow: hidden;
}
.login-bg-blur {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 60vw;
  height: 60vw;
  max-width: 700px;
  max-height: 700px;
  background: radial-gradient(circle, #1677ff33 0%, #fff0 80%);
  filter: blur(60px);
  transform: translate(-50%, -50%);
  z-index: 0;
  pointer-events: none;
}
.login-card {
  position: relative;
  z-index: 1;
  background: rgba(255,255,255,0.92);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(22,119,255,0.10);
  padding: 56px 48px 32px 48px;
  max-width: 380px;
  min-width: 0;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(8px);
  box-sizing: border-box;
}
.login-logo-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 36px;
}
.login-logo {
  width: 68px;
  height: 68px;
  border-radius: 16px;
  margin-bottom: 14px;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.08);
}
.login-title {
  font-size: 26px;
  font-weight: bold;
  color: #1677ff;
  letter-spacing: 2px;
}
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 18px;
}
.form-group {
  position: relative;
  display: flex;
  align-items: center;
}
.input-icon {
  position: absolute;
  left: 14px;
  font-size: 18px;
  color: #bfbfbf;
  z-index: 2;
}
.form-group input {
  width: 100%;
  height: 46px;
  border: 1.5px solid #e5e6eb;
  border-radius: 10px;
  padding: 0 14px 0 38px;
  font-size: 17px;
  outline: none;
  transition: border 0.2s;
  background: #f7f8fa;
  box-sizing: border-box;
}
.form-group input:focus {
  border: 1.5px solid #1677ff;
  background: #fff;
}
.login-btn {
  width: 100%;
  height: 46px;
  background: linear-gradient(90deg, #1677ff 0%, #40a9ff 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
  margin-top: 8px;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.08);
}
.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.login-error {
  color: #ff4d4f;
  margin-top: 8px;
  text-align: center;
  font-size: 15px;
}
.login-footer {
  margin-top: 18px;
  color: #bfbfbf;
  font-size: 14px;
  text-align: center;
  letter-spacing: 1px;
}
@media (max-width: 900px) {
  .login-card {
    padding: 32px 4vw 18px 4vw;
    min-width: 0;
    max-width: 98vw;
    width: 100%;
  }
  .login-title {
    font-size: 20px;
  }
  .login-logo {
    width: 44px;
    height: 44px;
  }
  .login-btn {
    font-size: 15px;
    height: 38px;
  }
}
</style> 