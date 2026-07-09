"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../../services/api");
Page({
    data: {
        enterpriseName: '',
        inputFocus: false,
        loading: false,
        hasResult: false,
        errorMsg: '',
        result: null,
    },
    onInput(e) {
        this.setData({ enterpriseName: e.detail.value, errorMsg: '' });
    },
    onFocus() {
        this.setData({ inputFocus: true });
    },
    onBlur() {
        this.setData({ inputFocus: false });
    },
    onClear() {
        this.setData({
            enterpriseName: '',
            hasResult: false,
            result: null,
            errorMsg: '',
        });
    },
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
    async fetchPlan(enterpriseName) {
        try {
            const res = await api_1.enterpriseApi.getPlan(enterpriseName);
            this.setData({
                loading: false,
                hasResult: true,
                result: res.data,
            });
        }
        catch {
            this.setData({
                loading: false,
                errorMsg: '查询失败，请确认企业名称后重试',
            });
        }
    },
});
