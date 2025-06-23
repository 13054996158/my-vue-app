<script setup>
</script>

<template>
  <router-view />
</template>

<style>
:root {
  --primary: #1677ff;
  --header-height: 56px;
  --sidebar-bg: #23272e;
  --sidebar-width: 220px;
  --property-width: 260px;
  --content-bg: #f5f7fa;
  --font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Arial, sans-serif;
}
body, .app-root {
  font-family: var(--font-family);
  color: #222;
}
.app-root {
  min-height: 100vh;
  background: var(--content-bg);
}
.app-header {
  height: var(--header-height);
  background: #1a1d23;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.06);
  z-index: 10;
  position: relative;
}
.logo-area {
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo-img {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px 0 rgba(22,119,255,0.08);
}
.logo-text {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
.user {
  font-size: 16px;
  font-weight: 400;
}
.avatar-dropdown {
  position: relative;
  display: flex;
  align-items: center;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #fff;
  border: 2px solid #fff;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.avatar:hover {
  box-shadow: 0 0 0 2px #1677ff44;
}
.dropdown-menu {
  display: none;
  position: absolute;
  top: 40px;
  right: 0;
  background: #fff;
  color: #222;
  border-radius: 8px;
  box-shadow: 0 4px 16px 0 rgba(0,0,0,0.08);
  min-width: 120px;
  padding: 12px 0;
  z-index: 100;
}
.avatar-dropdown:hover .dropdown-menu {
  display: block;
}
.header-divider {
  height: 1px;
  background: #e5e6eb;
  width: 100vw;
  min-width: 100%;
  box-shadow: 0 1px 0 #f0f1f2;
}
.main-layout {
  display: flex;
  height: calc(100vh - var(--header-height) - 1px);
  min-width: 0;
}
.sidebar {
  width: var(--sidebar-width);
  min-width: 140px;
  background: var(--sidebar-bg);
  color: #fff;
  box-shadow: 2px 0 8px #f0f1f2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 32px;
  transition: width 0.2s;
}
.content {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 0;
  background: var(--content-bg);
  transition: padding 0.2s;
}
.canvas-wrapper {
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.property-panel {
  width: var(--property-width);
  min-width: 120px;
  background: #fff;
  border-left: 1px solid #f0f0f0;
  box-shadow: -2px 0 8px #f0f1f2;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: width 0.2s;
  position: relative;
}
.property-title {
  font-size: 18px;
  font-weight: 600;
  margin: 32px 0 16px 0;
  color: #1677ff;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
  width: 100%;
  padding: 8px 0 8px 0;
}
.property-placeholder {
  color: #bfbfbf;
  font-size: 15px;
  margin-top: 32px;
}
@media (max-width: 1200px) {
  .sidebar {
    width: 60px;
    padding-top: 16px;
  }
  .property-panel {
    width: 80px;
    padding: 0 6px;
  }
  .content {
    padding: 16px 0;
  }
  .canvas-wrapper {
    max-width: 100vw;
  }
}
@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
  }
  .sidebar, .property-panel {
    width: 100vw;
    min-width: 0;
    box-shadow: none;
    border: none;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 8px 0;
  }
  .content {
    padding: 8px 0;
  }
}
@media (max-width: 600px) {
  .app-header {
    padding: 0 8px;
    font-size: 16px;
  }
  .logo-text {
    font-size: 16px;
  }
  .user {
    font-size: 12px;
  }
  .avatar {
    width: 24px;
    height: 24px;
  }
  .property-title {
    font-size: 14px;
  }
  .property-placeholder {
    font-size: 12px;
  }
}
</style>
