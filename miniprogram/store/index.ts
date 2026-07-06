// ============================================
// 轻量状态管理 — 跨页面共享数据
// ============================================

interface StoreData {
  userInfo: UserInfo | null;
  token: string;
  isLogin: boolean;
}

// 页面订阅者
type Listener = (data: StoreData) => void;
const listeners: Listener[] = [];

const store: StoreData = {
  userInfo: null,
  token: wx.getStorageSync('token') || '',
  isLogin: false,
};

// 订阅数据变化
export function subscribe(fn: Listener) {
  listeners.push(fn);
  fn(store);
}

// 更新状态
export function setStore(partial: Partial<StoreData>) {
  Object.assign(store, partial);
  listeners.forEach((fn) => fn(store));
}

// 获取当前状态
export function getStore(): StoreData {
  return { ...store };
}

// ====== 便捷方法 ======

/** 设置登录态 */
export function setLogin(userInfo: UserInfo, token: string) {
  wx.setStorageSync('token', token);
  setStore({ userInfo, token, isLogin: true });
}

/** 退出登录 */
export function logout() {
  wx.removeStorageSync('token');
  setStore({ userInfo: null, token: '', isLogin: false });
}

export default { subscribe, setStore, getStore, setLogin, logout };
