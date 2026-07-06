import { policyApi } from '../../services/api';

const CATEGORIES = [
  { label: '全部', value: '' },
  { label: '科技', value: 'tech' },
  { label: '财税', value: 'finance' },
  { label: '人才', value: 'talent' },
  { label: '产业', value: 'industry' },
];

Page({
  data: {
    categories: CATEGORIES,
    activeCategory: '',
    policyList: [] as Policy[],
    page: 1,
    pageSize: 10,
    total: 0,
    hasMore: true,
    loading: false,
  },

  onLoad() {
    this.fetchPolicies();
  },

  onPullDownRefresh() {
    this.setData({ page: 1, policyList: [], hasMore: true });
    this.fetchPolicies().then(() => wx.stopPullDownRefresh());
  },

  onReachBottom() {
    if (this.data.hasMore && !this.data.loading) {
      this.fetchPolicies();
    }
  },

  // 切换分类
  onCategoryChange(e: WechatMiniprogram.TouchEvent) {
    const { value } = e.currentTarget.dataset;
    if (value === this.data.activeCategory) return;
    this.setData({
      activeCategory: value,
      page: 1,
      policyList: [],
      hasMore: true,
    });
    this.fetchPolicies();
  },

  // 获取政策列表
  async fetchPolicies() {
    if (this.data.loading) return;
    this.setData({ loading: true });

    try {
      const res = await policyApi.getList({
        page: this.data.page,
        pageSize: this.data.pageSize,
        category: this.data.activeCategory || undefined,
      });

      const { list, total } = res.data;
      this.setData({
        policyList: this.data.page === 1 ? list : [...this.data.policyList, ...list],
        total,
        hasMore: this.data.policyList.length + list.length < total,
        page: this.data.page + 1,
        loading: false,
      });
    } catch {
      this.setData({ loading: false });
    }
  },

  // 点击政策卡片
  onPolicyTap(e: WechatMiniprogram.TouchEvent) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}` });
  },

  // 收藏/取消收藏
  async onToggleFavorite(e: WechatMiniprogram.CustomEvent) {
    const { id, isFavorite } = e.detail;
    try {
      await policyApi.toggleFavorite(id, isFavorite);

      // 本地更新状态
      const index = this.data.policyList.findIndex((p) => p.id === id);
      if (index !== -1) {
        this.setData({
          [`policyList[${index}].isFavorite`]: !isFavorite,
        });
      }

      wx.showToast({
        title: isFavorite ? '已取消收藏' : '已收藏',
        icon: 'success',
      });
    } catch {
      // 请求层已处理提示
    }
  },
});
