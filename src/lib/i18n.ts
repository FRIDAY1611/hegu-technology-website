// 简化版 i18n - 基础语言支持
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];
