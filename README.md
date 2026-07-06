# 博友政策咨询 — 微信小程序

> 输入企业名称，一键生成深圳政策申报规划

## 👥 团队分工

| 角色 | 负责人 | 职责 |
|------|--------|------|
| 前端 | 郑成博（zhengchengbo） | 小程序界面、交互、结果展示 |
| 后端 | 陈艳强 | 企查查数据查询、政策匹配、规划生成 |

## 🛠 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | 原生微信小程序 |
| 语言 | TypeScript |
| 样式 | Less |
| 工程化 | ESLint + Prettier |

## 📁 项目结构

```
boyou-policy-consulting/
├── miniprogram/
│   ├── app.ts                 # 入口逻辑
│   ├── app.json               # 路由配置
│   ├── app.less               # 全局样式
│   ├── pages/
│   │   └── index/             # 首页（搜索 + 结果展示）
│   ├── services/
│   │   └── api.ts             # API 接口层
│   ├── utils/
│   │   └── request.ts         # 网络请求封装
│   ├── styles/
│   │   └── variables.less     # 全局样式变量
│   └── typings/
│       └── index.d.ts         # 类型定义
├── package.json
├── tsconfig.json
└── .prettierrc
```

## 📡 后端接口

### 企业申报规划查询

**POST** `/api/enterprise/plan`

**请求：**
```json
{
  "enterpriseName": "深圳市某某科技有限公司"
}
```

**响应：**
```json
{
  "code": 0,
  "data": {
    "enterprise": {
      "name": "企业名称",
      "creditCode": "统一信用代码",
      "legalPerson": "法人",
      "registeredCapital": "注册资本",
      "establishDate": "成立日期",
      "industry": "行业",
      "address": "地址",
      "businessScope": "经营范围",
      "status": "经营状态"
    },
    "plan": {
      "totalPolicies": 8,
      "totalAmount": "约50-80万元",
      "items": [{
        "policyName": "政策名称",
        "department": "发布部门",
        "matchReason": "匹配原因",
        "amount": "补贴金额",
        "deadline": "截止日期",
        "difficulty": "低/中等/高",
        "steps": ["步骤1", "步骤2"],
        "url": "政策原文链接"
      }]
    }
  }
}
```

## 🚀 快速开始

1. 下载 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开工具 → 导入项目 → 选择 `miniprogram/` 目录
3. 填入 AppID：`wx1b3f853496dd6236`
4. 扫码登录即可预览

---

**Made with ❤️ by 博友团队**
