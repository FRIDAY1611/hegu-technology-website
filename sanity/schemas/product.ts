import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: '产品',
  type: 'document',
  fields: [
    defineField({
      name: 'model',
      title: '型号',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: '系列',
      type: 'string',
      options: {
        list: [
          { title: 'AC 交流电', value: 'AC' },
          { title: 'DC 直流电', value: 'DC' },
          { title: 'Outdoor 户外', value: 'Outdoor' },
          { title: 'Industrial 工业', value: 'Industrial' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: '产品图片',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'description',
      title: '产品描述',
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
      name: 'specs',
      title: '规格参数',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: '参数名称（多语言）', type: 'object', fields: [
              { name: 'zh', title: '中文', type: 'string' },
              { name: 'en', title: 'English', type: 'string' },
              { name: 'es', title: 'Español', type: 'string' },
              { name: 'fr', title: 'Français', type: 'string' },
              { name: 'de', title: 'Deutsch', type: 'string' },
              { name: 'ar', title: 'العربية', type: 'string' },
            ]},
            { name: 'value', title: '参数值', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: '功能特点',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: '图标名称', type: 'string' },
            { name: 'title', title: '标题（多语言）', type: 'object', fields: [
              { name: 'zh', title: '中文', type: 'string' },
              { name: 'en', title: 'English', type: 'string' },
              { name: 'es', title: 'Español', type: 'string' },
              { name: 'fr', title: 'Français', type: 'string' },
              { name: 'de', title: 'Deutsch', type: 'string' },
              { name: 'ar', title: 'العربية', type: 'string' },
            ]},
          ],
        },
      ],
    }),
    defineField({
      name: 'packing',
      title: '包装信息',
      type: 'object',
      fields: [
        { name: 'cartonSize', title: '外箱尺寸', type: 'string' },
        { name: 'pcsCtn', title: '每箱数量', type: 'string' },
        { name: 'gw', title: '毛重', type: 'string' },
        { name: 'nw', title: '净重', type: 'string' },
        { name: 'cbm', title: '体积', type: 'string' },
        { name: 'container20ft', title: '20尺柜', type: 'string' },
        { name: 'container40hq', title: '40尺高柜', type: 'string' },
      ],
    }),
    defineField({
      name: 'order',
      title: '排序',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isFeatured',
      title: '精选产品',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: '排序',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
