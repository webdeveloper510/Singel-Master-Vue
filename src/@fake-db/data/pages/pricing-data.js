import mock from '@/@fake-db/mock'
/* eslint-disable global-require */
const data = {
  pricing: {
    data: [
      {
        price: '9.99',
        coin: '70',
      }, {
        price: '29.99',
        coin: '215',
      },
      {
        price: '49.99',
        coin: '375',
      },
      {
        price: '119.99',
        coin: '995',
      }, {
        price: '199.99',
        coin: '1810',
      },
      {
        price: '299.99',
        coin: '2850',
      },
    ],
    qandA: [
      {
        question: 'Does my subscription automatically renew?',
        ans:
                    'Pastry pudding cookie toffee bonbon jujubes jujubes powder topping. Jelly beans gummi bears sweet roll bonbon muffin liquorice. Wafer lollipop sesame snaps. Brownie macaroon cookie muffin cupcake candy caramels tiramisu. Oat cake chocolate cake sweet jelly-o brownie biscuit marzipan. Jujubes donut marzipan chocolate bar. Jujubes sugar plum jelly beans tiramisu icing cheesecake.',
      },
      {
        question: 'Can I store the item on an intranet so everyone has access?',
        ans:
                    'Tiramisu marshmallow dessert halvah bonbon cake gingerbread. Jelly beans chocolate pie powder. Dessert pudding chocolate cake bonbon bear claw cotton candy cheesecake. Biscuit fruitcake macaroon carrot cake. Chocolate cake bear claw muffin chupa chups pudding.',
      },
      {
        question: 'Am I allowed to modify the item that I purchased?',
        ans:
                    'Tart gummies dragée lollipop fruitcake pastry oat cake. Cookie jelly jelly macaroon icing jelly beans soufflé cake sweet. Macaroon sesame snaps cheesecake tart cake sugar plum. Dessert jelly-o sweet muffin chocolate candy pie tootsie roll marzipan. Carrot cake marshmallow pastry. Bonbon biscuit pastry topping toffee dessert gummies. Topping apple pie pie croissant cotton candy dessert tiramisu.',
      },
    ],
  },
}
/* eslint-disable global-require */
mock.onGet('/pricing/data').reply(() => [200, data.pricing])
