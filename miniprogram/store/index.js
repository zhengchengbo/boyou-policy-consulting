"use strict";
// ============================================
// 轻量状态管理 — 跨页面共享数据
// ============================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.setLogin = exports.getStore = exports.setStore = exports.subscribe = void 0;
const listeners = [];
const store = {
    userInfo: null,
    token: wx.getStorageSync('token') || '',
    isLogin: false,
};
// 订阅数据变化
function subscribe(fn) {
    listeners.push(fn);
    fn(store);
}
exports.subscribe = subscribe;
// 更新状态
function setStore(partial) {
    Object.assign(store, partial);
    listeners.forEach((fn) => fn(store));
}
exports.setStore = setStore;
// 获取当前状态
function getStore() {
    return { ...store };
}
exports.getStore = getStore;
// ====== 便捷方法 ======
/** 设置登录态 */
function setLogin(userInfo, token) {
    wx.setStorageSync('token', token);
    setStore({ userInfo, token, isLogin: true });
}
exports.setLogin = setLogin;
/** 退出登录 */
function logout() {
    wx.removeStorageSync('token');
    setStore({ userInfo: null, token: '', isLogin: false });
}
exports.logout = logout;
exports.default = { subscribe, setStore, getStore, setLogin, logout };
