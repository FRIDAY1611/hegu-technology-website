import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'companyInfo',
  title: '公司信息',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: '公司名称（多语言）',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'string' },
        { name: 'en', title: 'English', type: 'string' },
        { name: 'es', title: 'Español', type: 'string' },
        { name: 'fr', title: 'Français', type: 'string' },
        { name: 'de', title: 'Deutsch', type: 'string' },
        { name: 'ar', title: 'العربية', type: 'string' },
      ],
    }),
    defineField({
      name: 'address',
      title: '地址（多语言）',
      type: 'object',
      fields: [
        { name: 'zh', title: '中文', type: 'text' },
        { name: 'en', title: 'English', type: 'text' },
        { name: 'es', title: 'Español', type: 'text' },
        { name: 'fr', title: 'Français', type: 'text' },
        { name: 'de', title: 'Deutsch', type: 'text' },
        { name: 'ar', title: 'العربية', type: 'text' },
      ],
    }),
    defineField({
      name: 'phone',
      title: '电话',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: '邮箱',
      type: 'string',
    }),
    defineField({
      name: 'contacts',
      title: '社交媒体',
      type: 'object',
      fields: [
        { name: 'wechat', title: '微信号', type: 'string' },
        { name: 'whatsapp', title: 'WhatsApp', type: 'string' },
        { name: 'youtube', title: 'YouTube', type: 'string' },
        { name: 'linkedin', title: 'LinkedIn', type: 'string' },
        { name: 'tiktok', title: 'TikTok', type: 'string' },
      ],
    }),
  ],
})
