// ============================================
// 网络请求封装
// 统一处理 token、错误、loading
// ============================================

const BASE_URL = 'https://www.boyouzc.com/api'; // 后端API地址 - 已配置Nginx反代到服务器

interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: Record<string, unknown>;
  header?: Record<string, string>;
  showLoading?: boolean;
}

function request<T = unknown>(options: RequestOptions): Promise<ApiRes<T>> {
  const token = wx.getStorageSync('token') || '';

  if (options.showLoading !== false) {
    wx.showLoading({ title: '加载中...', mask: true });
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...options.header,
      },
      success(res) {
        wx.hideLoading();
        const data = res.data as ApiRes<T>;

        if (res.statusCode === 200 && data.code === 0) {
          resolve(data);
        } else if (res.statusCode === 401) {
          // token 过期，跳转登录
          wx.removeStorageSync('token');
          wx.showToast({ title: '请重新登录', icon: 'none' });
          reject(data);
        } else {
          wx.showToast({ title: data.message || '请求失败', icon: 'none' });
          reject(data);
        }
      },
      fail(err) {
        wx.hideLoading();
        wx.showToast({ title: '网络异常，请稍后重试', icon: 'none' });
        reject(err);
      },
    });
  });
}

export default request;
