// schemas/order.js
export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      {
        name: 'customerName',
        title: 'Customer Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'phone',
        title: 'Phone',
        type: 'string',
      },
      {
        name: 'address',
        title: 'Address',
        type: 'text',
      },
      {
        name: 'city',
        title: 'City',
        type: 'string',
      },
      {
        name: 'paymentMethod',
        title: 'Payment Method',
        type: 'string',
      },
      {
        name: 'totalPrice',
        title: 'Total Price',
        type: 'number',
      },
      {
        name: 'items',
        title: 'Items',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'productName',
                title: 'Product Name',
                type: 'string',
              },
              {
                name: 'quantity',
                title: 'Quantity',
                type: 'number',
              },
              {
                name: 'price',
                title: 'Price',
                type: 'number',
              },
            ],
          },
        ],
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        options: {
          dateFormat: 'YYYY-MM-DD',
          timeFormat: 'HH:mm',
          timeStep: 15,
        },
      },
    ],
    initialValue: {
      createdAt: new Date().toISOString(),
    },
  };