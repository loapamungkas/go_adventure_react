import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import { BsPlus, BsEyeFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('https://goadventure.my.id/api/produk?limit=8');
      const data = await response.json();
      //   console.log(data.data.data);
      setProducts(data.data.data);
    };
    fetchProducts();
  }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch('https://goadventure.my.id/api/kategori');
      const data = await response.json();
      //   console.log(data.data.data);
      setCategories(data);
    };
    fetchCategory();
  }, []);

  return (
    <>
      <Hero />
      {/* Content */}
      {/* Category */}
      <div className="text-xl font-bold my-5 text-start">Categories</div>
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          // console.log(category);
          return (
            <Link key={category.id} to={`/category/${category.id}`}>
              <div className="card w-full h-full py-3 bg-base-100 shadow-xl justify-center border">
                <h3 className="font-bold text-xs">{category.nama_kategori}</h3>
              </div>
            </Link>
          );
        })}
      </div>
      {/* Product */}
      <div className="text-xl font-bold my-5 text-start">New Product</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          return (
            <div key={product.id}>
              <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
                <div className="w-full h-full flex justify-center items-center">
                  {/* image */}
                  <div className="w-[200px] mx-auto flex justify-center items-center">
                    <img src={`https://goadventure.my.id/storage/${product.produk_photo_path}`} className="h-full group-hover:scale-110 transition duration-300" alt="" />
                  </div>
                </div>
                <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col items-center justify-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button>
                    <div className="flex justify-center items-center text-white bg-red-500 w-10 h-10">
                      <BsPlus className="text-3xl" />
                    </div>
                  </button>
                  <Link to={`/product/${product.id}`} className="w-10 h-10 bg-white flex justify-center items-center text-gray-900 drop-shadow-xl">
                    <BsEyeFill />
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-sm capitalize text-gray-500">{product.kategori.nama_kategori}</div>
                <Link to={`/product/${product.id}`}>
                  <h2 className="font-semibold mb-1">{product.nama_produk}</h2>
                </Link>
                <div className="font-semibold">{`Rp.${new Intl.NumberFormat('id-ID').format(product.harga)}`}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center items-center mt-5">
        <div className="btn btn-gray-500">
          <Link to={'/category'}>Lihat Lainnya</Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Home;
