/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import cartIcon from '../public/icons/cart.png'

export default function ProductItem({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="w-full shadow rounded-[20px]"
          />
        </a>
      </Link>
      <div className="text-start px-[0px] py-[10px]">
        <Link href="/"><a  className='text-[14px] tracking-[0.5px] text-[#606063] font-[thin]'>{product.brand}</a></Link>
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-[18px] text-[#1a1a1a]">{product.name}</h2>
          </a>
        </Link>
        <div className='gap-1'>
          {Array.from({length: 5 }, (_, i) => (
            <Image width='16px' height='16px' className='border-none' key={i} src="/../public/icons/star.png" alt='star-icon'/>
          ))}

        </div>
        <h4 className='pt-[7px] text-[16px] text-normal text-[#088178]'>${product.price}</h4>
      </div>
      <div className="flex absolute w-[40px] h-[40px] leading-10 rounded-full bg-[#e8f0ed] border-[1px_solid_#cce7d0] text-400 bottom-[15px] right-[15px]" onClick={() => addToCartHandler(product)}>
          <div className='flex m-auto'>
            <Image width='20px' height='20px' src={cartIcon} alt="cart"/>
          </div>
      </div>
    </div>
  );
}
