import { enterpriseApi } from '../../services/api';

Page({
  data: {
    enterpriseName: '',
    inputFocus: false,
    loading: false,
    hasResult: false,
    errorMsg: '',
    result: null as PlanResult | null,
  },

  // 输入变化
  onInput(e: WechatMiniprogram.Input) {
    this.setData({ enterpriseName: e.detail.value, errorMsg: '' });
  },

  // 输入框聚焦/失焦（用于边框高亮）
  onFocus() {
    this.setData({ inputFocus: true });
  },

  onBlur() {
    this.setData({ inputFocus: false });
  },

  // 清除输入
  onClear() {
    this.setData({
      enterpriseName: '',
      hasResult: false,
      result: null,
      errorMsg: '',
      inputFocus: false,
    });
  },

  // 搜索提交
  onSearch() {
    const name = this.data.enterpriseName.trim();
    if (!name) {
      wx.showToast({ title: '请输入企业名称', icon: 'none' });
      return;
    }

    if (name.length < 4) {
      wx.showToast({ title: '请输入完整的企业名称', icon: 'none' });
      return;
    }

    this.setData({ loading: true, errorMsg: '', result: null, hasResult: false });
    this.fetchPlan(name);
  },

  // 调用后端接口
  async fetchPlan(enterpriseName: string) {
    try {
      const res = await enterpriseApi.getPlan(enterpriseName);

      this.setData({
        loading: false,
        hasResult: true,
        result: res.data as PlanResult,
      });

      // 滚动到结果区域
      wx.pageScrollTo({ scrollTop: 0, duration: 300 });
    } catch {
      this.setData({
        loading: false,
        errorMsg: '查询失败，请确认企业名称正确后重试',
      });
    }
  },

  // 查看政策原文
  onOpenLink(e: WechatMiniprogram.TouchEvent) {
    const { url } = e.currentTarget.dataset;
    if (url) {
      // 在 web-view 或复制链接
      wx.setClipboardData({
        data: url,
        success() {
          wx.showToast({ title: '链接已复制，请在浏览器中打开', icon: 'none' });
        },
      });
    }
  },
});
