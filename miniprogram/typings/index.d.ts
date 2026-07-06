// ============================================
// API 类型定义 — 与后端陈艳强约定接口
// ============================================

/** 通用响应结构 */
interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/** 分页参数 */
interface PaginationParams {
  page: number;
  pageSize: number;
}

/** 分页响应 */
interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ====== 政策相关 ======

/** 政策条目 */
interface Policy {
  id: number;
  title: string;
  category: string; // 政策分类：科技、财税、人才等
  department: string; // 发布部门
  publishDate: string; // 发布日期
  deadline: string; // 申报截止日期
  amount: string; // 补贴金额范围
  region: string; // 适用地区
  tags: string[]; // 标签
  summary: string; // 摘要
  isFavorite: boolean; // 是否收藏
}

// ====== 用户相关 ======

/** 用户信息 */
interface UserInfo {
  id: number;
  openid: string;
  nickName: string;
  avatarUrl: string;
  phone: string;
  company: string; // 企业名称
}

// ====== 搜索相关 ======

/** 搜索参数 */
interface SearchParams extends PaginationParams {
  keyword?: string;
  category?: string;
  region?: string;
  amountRange?: string;
}

// ====== 企业申报规划 ======

/** 企业信息（企查查返回） */
interface EnterpriseInfo {
  name: string;
  creditCode: string;
  legalPerson: string;
  registeredCapital: string;
  establishDate: string;
  industry: string;
  address: string;
  businessScope: string;
  status: string;
}

/** 申报规划中的单条政策 */
interface PlanItem {
  policyName: string;
  department: string;
  matchReason: string;
  amount: string;
  deadline: string;
  difficulty: '低' | '中等' | '高';
  steps: string[];
  url: string;
}

/** 申报规划结果 */
interface PlanResult {
  enterprise: EnterpriseInfo;
  plan: {
    totalPolicies: number;
    totalAmount: string;
    items: PlanItem[];
  };
}

// ====== 类型导出（供全局使用） ======
declare type ApiRes<T = unknown> = ApiResponse<T>;
declare type PageParams = PaginationParams;
declare type PageData<T> = PaginatedData<T>;
