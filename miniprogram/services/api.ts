// ============================================
// API 接口层 — 按模块组织，和陈艳强约定
// ============================================

import request from '../utils/request';

// ====== 政策模块 ======
export const policyApi = {
  /** 获取政策列表（首页） */
  getList(params: SearchParams) {
    return request<PageData<Policy>>({
      url: '/policies',
      method: 'GET',
      data: params as unknown as Record<string, unknown>,
    });
  },

  /** 获取政策详情 */
  getDetail(id: number) {
    return request<Policy>({
      url: `/policies/${id}`,
      method: 'GET',
    });
  },

  /** 收藏/取消收藏 */
  toggleFavorite(id: number, isFavorite: boolean) {
    return request({
      url: `/policies/${id}/favorite`,
      method: isFavorite ? 'DELETE' : 'POST',
    });
  },

  /** 获取收藏列表 */
  getFavorites(params: PaginationParams) {
    return request<PageData<Policy>>({
      url: '/policies/favorites',
      method: 'GET',
      data: params as unknown as Record<string, unknown>,
    });
  },
};

// ====== 用户模块 ======
export const userApi = {
  /** 微信登录 */
  login(code: string) {
    return request<{ token: string; userInfo: UserInfo }>({
      url: '/user/login',
      method: 'POST',
      data: { code },
    });
  },

  /** 获取用户信息 */
  getProfile() {
    return request<UserInfo>({
      url: '/user/profile',
      method: 'GET',
    });
  },

  /** 更新用户信息 */
  updateProfile(data: Partial<UserInfo>) {
    return request({
      url: '/user/profile',
      method: 'PUT',
      data: data as unknown as Record<string, unknown>,
    });
  },
};

// ====== 搜索模块 ======
export const searchApi = {
  /** 搜索政策 */
  search(params: SearchParams) {
    return request<PageData<Policy>>({
      url: '/search',
      method: 'GET',
      data: params as unknown as Record<string, unknown>,
    });
  },

  /** 热门搜索 */
  getHotKeywords() {
    return request<string[]>({
      url: '/search/hot',
      method: 'GET',
    });
  },
};
