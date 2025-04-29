// schemas/styleSettings.js
export default {
  name: 'styleSettings',
  title: 'إعدادات النمط',
  type: 'document',
  fields: [
    {
      name: 'selectedStyle',
      title: 'النمط المختار',
      type: 'number',
      options: {
        list: [
          { title: 'النمط الأول', value: 1 },
          { title: 'النمط الثاني', value: 2 }
        ],
        layout: 'radio'
      },
      initialValue: 2,
      validation: Rule => Rule.required()
    }
  ]
}