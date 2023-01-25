import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: "Eliam",
      email: "bosc790@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: 'Jane',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },

  ],
  products: [
    {
        name: 'Frijoles refritos peruanos',
        slug: 'frijoles-refritos-peruanos-isadora',
        brand: 'Isadora',
        category: 'Frijoles',
        hallway: "Groceries",
        image: '/img/frijolesisadora.png',
        packing: 'Doypack',
        content: '400g',
        price: 70,
        rating: 4.5,
        numReviews: 8,
        countInStock: 20,
        description: 'Ricos frijolitos refritos',
        isFeatured: true,
        banner: '/img/banner0.png',
        isOffer: false,
    }, 
    {
        name: 'Pan de sandwich Integral',
        slug: 'pan-de-sandwich-integral-bimbo',
        brand: 'Bimbo',
        category: 'Pan',
        hallway: "Bakery",
        image: '/img/pandesandwich.png',
        packing: 'Doypack',
        content: '680g',
        price: 70,
        rating: 4.5,
        numReviews: 8,
        countInStock: 20,
        description: 'Ricos frijolitos refritos',
        isFeatured: true,
        banner: '/img/banner1.png',
        isOffer: false,
    },
  ],
};

export default data;
