# 博友政策咨询 — 微信小程序

> 企业政策红利挖掘者与守护者

## 👥 团队分工

| 角色 | 负责人 | 职责 |
|------|--------|------|
| 前端 | 郑成博（zhengchengbo） | 小程序界面、交互、API 对接 |
| 后端 | 陈艳强 | 接口服务、数据库、业务逻辑 |

## 🛠 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | 原生微信小程序 |
| 语言 | TypeScript |
| 样式 | Less |
| 代码规范 | ESLint + Prettier |
| 状态管理 | 轻量自研 Store |

## 📁 项目结构

```
boyou-policy-consulting/
├── miniprogram/               # 小程序源码
│   ├── app.ts                 # 入口逻辑
│   ├── app.json               # 全局配置
│   ├── app.less               # 全局样式
│   ├── pages/                 # 页面
│   │   ├── index/             # 首页（政策列表）
│   │   ├── search/            # 搜索页
│   │   └── detail/            # 详情页
│   ├── components/            # 组件
│   │   └── policy-card/       # 政策卡片
│   ├── services/              # API 请求
│   │   └── api.ts             # 接口定义
│   ├── store/                 # 状态管理
│   │   └── index.ts
│   ├── utils/                 # 工具函数
│   │   └── request.ts         # 请求封装
│   ├── styles/                # 全局样式变量
│   │   └── variables.less
│   └── typings/               # 类型定义
│       └── index.d.ts
├── package.json
├── tsconfig.json
└── .prettierrc
```

## 🚀 快速开始

1. 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开工具，导入 `miniprogram/` 目录
3. 扫码登录
4. 点击「预览」即可手机体验

## 📡 后端接口

后端接口文档由陈艳强提供，前端在 `miniprogram/utils/request.ts` 中配置 `BASE_URL`。

### 已约定的接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 政策列表 | GET | `/api/policies` | 分页、分类筛选 |
| 政策详情 | GET | `/api/policies/:id` | 单条详情 |
| 收藏切换 | POST/DELETE | `/api/policies/:id/favorite` | 收藏/取消 |
| 微信登录 | POST | `/api/user/login` | code 换 token |
| 用户信息 | GET | `/api/user/profile` | 获取/更新 |
| 搜索 | GET | `/api/search` | 关键词搜索 |

## 📝 开发规范

- 所有新页面/组件使用 TypeScript（`.ts`）
- 样式使用 Less，变量统一从 `styles/variables.less` 引用
- API 调用统一走 `services/api.ts`
- 提交前运行 `npm run format` 格式化代码

---

**Made with ❤️ by 博友团队**
