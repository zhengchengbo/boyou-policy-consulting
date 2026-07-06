Component({
  properties: {
    policy: {
      type: Object,
      value: {} as Policy,
    },
  },

  methods: {
    // 点击卡片 => 跳转详情
    onTap() {
      this.triggerEvent('tap', { id: this.data.policy.id });
    },

    // 收藏按钮（catch:tap 阻止冒泡）
    onFavorite() {
      const { id, isFavorite } = this.data.policy;
      this.triggerEvent('favorite', { id, isFavorite });
    },
  },
});
