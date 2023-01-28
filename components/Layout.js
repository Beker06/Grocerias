import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../utils/Store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import DropdownLink from './DropdownLink';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';
import LogoHorizontal from "../public/img/LogoTrans.png";
import Bars from "../public/icons/bars2.png"
import Image from 'next/image';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  return (
    <>
      <Head>
      <title>{title ? title + " | Grocerias" : "Grocerias"}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Punto de Venta Web" />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0"
        />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="fixed z-10 flex w-full h-[6rem] items-center px-4 justify-between shadow-md bg-white">
            <div className='w-[3rem] ml-8 cursor-pointer'>
              <Image src={Bars} alt="bars" />
            </div>
            <div className='w-[14rem] ml-10'>
              <Link href="/">
                <a>
                  <Image src={LogoHorizontal} alt="grocerias" />
                </a>
              </Link>
            </div>
            <form
              onSubmit={submitHandler}
              className="mx-auto  hidden w-full justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="rounded-tr-none rounded-br-none py-1 px-2 text-[16px] font-thin w-[24rem] h-[3rem]   focus:ring-0"
                placeholder="Search products"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-azul-fondo p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchIcon className="h-7 w-9"></SearchIcon>
              </button>
            </form>
            <div className="h-full flex flex-row items-center text-black">
              <Link href="/cart">
                <a className="m-5 p-4 relative rounded-full bg-azul-fondo flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    color="#000"
                    size="xl"
                  />
                  {cartItemsCount > 0 && (
                    <span className="absolute top-[-10px] right-[-5px] rounded-full bg-red-600 px-2 py-1 text-xs font-normal text-white">
                      {cartItemsCount}
                    </span>
                  )}
                </a>
                </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-black">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropdownLink
                          className="dropdown-link"
                          href="/admin/dashboard"
                        >
                          Admin Dashboard
                        </DropdownLink>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2 text-black">Login</a>
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-[120px] px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          <span>Copyright © 2023 Grocerias</span>
        </footer>
      </div>
    </>
  );
}
