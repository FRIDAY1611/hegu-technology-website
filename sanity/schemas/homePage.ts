import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: '首页内容',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero区域',
      type: 'object',
      fields: [
        { name: 'slides', title: '轮播图', type: 'array', of: [
          { type: 'object', fields: [
            { name: 'image', title: '图片', type: 'image', options: { hotspot: true } },
            { name: 'title', title: '标题（多语言）', type: 'object', fields: [
              { name: 'zh', title: '中文', type: 'string' },
              { name: 'en', title: 'English', type: 'string' },
              { name: 'es', title: 'Español', type: 'string' },
              { name: 'fr', title: 'Français', type: 'string' },
              { name: 'de', title: 'Deutsch', type: 'string' },
              { name: 'ar', title: 'العربية', type: 'string' },
            ]},
          ]}
        ]},
      ],
    }),
    defineField({
      name: 'advantages',
      title: '公司优势',
      type: 'array',
      of: [
        { type: 'object', fields: [
          { name: 'icon', title: '图标', type: 'string' },
          { name: 'title', title: '标题（多语言）', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
            { name: 'es', title: 'Español', type: 'string' },
            { name: 'fr', title: 'Français', type: 'string' },
            { name: 'de', title: 'Deutsch', type: 'string' },
            { name: 'ar', title: 'العربية', type: 'string' },
          ]},
          { name: 'description', title: '描述（多语言）', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'text' },
            { name: 'en', title: 'English', type: 'text' },
            { name: 'es', title: 'Español', type: 'text' },
            { name: 'fr', title: 'Français', type: 'text' },
            { name: 'de', title: 'Deutsch', type: 'text' },
            { name: 'ar', title: 'العربية', type: 'text' },
          ]},
        ]}
      ],
    }),
    defineField({
      name: 'partners',
      title: '合作伙伴',
      type: 'array',
      of: [
        { type: 'object', fields: [
          { name: 'flag', title: '国旗', type: 'string' },
          { name: 'name', title: '国家名称（多语言）', type: 'object', fields: [
            { name: 'zh', title: '中文', type: 'string' },
            { name: 'en', title: 'English', type: 'string' },
            { name: 'es', title: 'Español', type: 'string' },
            { name: 'fr', title: 'Français', type: 'string' },
            { name: 'de', title: 'Deutsch', type: 'string' },
            { name: 'ar', title: 'العربية', type: 'string' },
          ]},
        ]}
      ],
    }),
  ],
})
