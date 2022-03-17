import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name:"Matias",
            email:"admin@example.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: true,
        },

        {
            name:"John Sturgis",
            email:"user@example.com",
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        }
    ],

    products: [
        {
            //_id: "1",
            name:'Skinny Jeans',
            slug:'hollister-skinny-jeans',
            category: 'Pants',
            image: '/images/jeans.jpg',
            price: 49.99,
            countInStock: 25,
            brand: 'Hollister',
            rating: 4.7,
            numReviews: 245,
            description: 'Latest, hottest, trendiest jeans out there.'
        },

        {
            //_id: "2",
            name:'Slim Fit Jeans',
            slug:'slim-fit-jeans',
            category: 'Pants',
            image: '/images/d1.jpg',
            price: 39.99,
            countInStock: 18,
            brand: 'Apparel',
            rating: 4.3,
            numReviews: 18,
            description: 'Cop em now! These amazing jeans come in all sizes and colors, although we recommend black for a "cool" look.'
        },

        {
            //_id: "3",
            name:'Camo Shirt',
            slug:'camo-shirt',
            category: 'Tops',
            image: '/images/camoShirt.jpg',
            price: 19.99,
            countInStock: 39,
            brand: 'Fire Savoir',
            rating: 4.5,
            numReviews: 23,
            description: 'Classic, timeless, reinvented. You know you want one.'
        },

        {
            //_id: "4",
            name:'Cool Black Shoes',
            slug:'cool-black-shoes',
            category: 'Shoes',
            image: '/images/blackShoes.jpg',
            price: 69.99,
            countInStock: 92,
            brand: 'Nike',
            rating: 4.9,
            numReviews: 2330,
            description: "The name says it all, they're cool, black shoes!"
        },
    ]
}

export default data;