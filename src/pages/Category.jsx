import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/dist';
import { useParams } from 'react-router-dom';
import { BsPlus, BsEyeFill } from 'react-icons/bs';

const Category = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      const fetchProducts = async () => {
        const response = await fetch('https://goadventure.my.id/api/produk');
        const data = await response.json();
        //   console.log(data.data.data);
        setProducts(data.data.data);
        setFilteredUsers(data.data.data);
        setLoading(false);
      };
      fetchProducts();
    } else {
      const fetchProducts = async () => {
        const response = await fetch(`https://goadventure.my.id/api/produk?id_kategori=${id}`);
        const data = await response.json();
        //   console.log(data.data.data);
        setProducts(data.data.data);
        setFilteredUsers(data.data.data);
        setLoading(false);
      };
      fetchProducts();
    }
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

  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    // filter the items using the apiUsers state
    const filteredItems = products.filter((product) => product.nama_produk.toLowerCase().includes(searchTerm.toLowerCase()));

    setFilteredUsers(filteredItems);
  };

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href={'/'}>Home</a>
          </li>
          <li>Product</li>
        </ul>
      </div>
      <div className="grid md:grid-cols-4 gap-4 text-start">
        <div>
          <div className="mt-5">
            <input className="input input-bordered w-full" type="text" value={searchItem} onChange={handleInputChange} placeholder="Cari Produk..." />
          </div>
          <h2 className="text-2xl font-bold py-3">Categories</h2>
          <div>
            <ul className="menu bg-base-200 w-full rounded-box">
              <li>
                <a href="/category" className={`${!id ? 'bg-gray-700 text-white hover:bg-gray-700 ' : 'text-gray-700 hover:bg-gray-500 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}>
                  All
                </a>
              </li>
              {categories.map((category) => {
                return (
                  <li key={category.id}>
                    <a href={`/category/${category.id}`} className={`${id == category.id ? 'bg-gray-700 text-white hover:bg-gray-700 ' : 'text-gray-700 hover:bg-gray-500 hover:text-white'} rounded-md px-3 py-2 text-sm font-medium`}>
                      {category.nama_kategori}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="md:col-span-3 ms-5">
          <h2 className="text-2xl font-bold py-3">Product</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {loading && <p>Loading...</p>}
            {!loading && filteredUsers.length === 0 ? <p>Produk tidak tersedia...</p> : ''}
            {filteredUsers.map((product) => {
              return (
                <div key={product.id} className="text-center">
                  <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition rounded-xl">
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
        </div>
      </div>
    </>
  );
};

export default Category;
