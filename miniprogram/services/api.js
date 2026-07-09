"use strict";
// ============================================
// API 接口层 — 按模块组织，和陈艳强约定
// ============================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterpriseApi = exports.searchApi = exports.userApi = exports.policyApi = void 0;
const request_1 = __importDefault(require("../utils/request"));
// ====== 政策模块 ======
exports.policyApi = {
    /** 获取政策列表（首页） */
    getList(params) {
        return (0, request_1.default)({
            url: '/policies',
            method: 'GET',
            data: params,
        });
    },
    /** 获取政策详情 */
    getDetail(id) {
        return (0, request_1.default)({
            url: `/policies/${id}`,
            method: 'GET',
        });
    },
    /** 收藏/取消收藏 */
    toggleFavorite(id, isFavorite) {
        return (0, request_1.default)({
            url: `/policies/${id}/favorite`,
            method: isFavorite ? 'DELETE' : 'POST',
        });
    },
    /** 获取收藏列表 */
    getFavorites(params) {
        return (0, request_1.default)({
            url: '/policies/favorites',
            method: 'GET',
            data: params,
        });
    },
};
// ====== 用户模块 ======
exports.userApi = {
    /** 微信登录 */
    login(code) {
        return (0, request_1.default)({
            url: '/user/login',
            method: 'POST',
            data: { code },
        });
    },
    /** 获取用户信息 */
    getProfile() {
        return (0, request_1.default)({
            url: '/user/profile',
            method: 'GET',
        });
    },
    /** 更新用户信息 */
    updateProfile(data) {
        return (0, request_1.default)({
            url: '/user/profile',
            method: 'PUT',
            data: data,
        });
    },
};
// ====== 搜索模块 ======
exports.searchApi = {
    /** 搜索政策 */
    search(params) {
        return (0, request_1.default)({
            url: '/search',
            method: 'GET',
            data: params,
        });
    },
    /** 热门搜索 */
    getHotKeywords() {
        return (0, request_1.default)({
            url: '/search/hot',
            method: 'GET',
        });
    },
};
// ====== 企业申报规划 ======
exports.enterpriseApi = {
    /** 查询企业申报规划 */
    getPlan(enterpriseName) {
        return (0, request_1.default)({
            url: '/enterprise/plan',
            method: 'POST',
            data: { enterpriseName },
        });
    },
};
