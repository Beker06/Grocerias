import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import { Store } from '../utils/Store';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import dataBanner from '../data/bannerData'
import Image from 'next/image';

export default function Home({ products}) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home Page">
      <div>
        <Carousel width="100%" stopOnHover={false} showThumbs={false} infiniteLoop={true} showStatus={false} autoPlay>
          {dataBanner.map((product, id) => (
            <div key={`gallery-banner-${id + 1}`}>
              <Image src={require(`../public/img/${product.img}`)} alt="banner grocerias"/>
            </div>
          ))}
        </Carousel>
      </div>
      
      <h1 className="text-[24px] my-4">Mas Vendidos</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-5 ">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  const featuredProducts = await Product.find({ isFeatured: true }).lean();
  return {
    props: {
      featuredProducts: featuredProducts.map(db.convertDocToObj),
      products: products.map(db.convertDocToObj),
    },
  };
}
