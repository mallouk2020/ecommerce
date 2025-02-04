export default {
    name: 'product',
    title: 'product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
           of:[
            {type: "image",
             options:{hotspot:true}}
            ],
           
        },
        {
            name: 'name',
            title: 'name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'slug',
            type: 'slug',
            Options:{source:"name", maxlingth:90},
        },
        {
            name: 'details',
            title: 'details',
            type: 'string',
        },
        {
            name: 'price',
            title: 'price',
            type: 'number',
        },
    ]}
        