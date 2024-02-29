import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const PenyewaanDetails = () => {
  const { id } = useParams();
  const [penyewaans, setPenyewaans] = useState([]);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchPenyewaans = async () => {
      //   const response = await fetch(`https://goadventure.my.id/api/penyewaan/${id}`);
      const response = await fetch(`https://goadventure.my.id/api/penyewaan/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      //   console.log(data.data.data);
      setPenyewaans(data);
    };
    fetchPenyewaans();
  }, []);
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href={'/'}>Home</a>
          </li>
          <li>
            <Link to={'/history'}>History</Link>
          </li>
          <li>{penyewaans.user && penyewaans.user.nama}</li>
          <li>{penyewaans.id}</li>
        </ul>
      </div>
      <div className="grid md:grid-cols-3 mt-5">
        <div>
          <div className="w-full mx-auto flex justify-center items-center">
            <img src={`https://goadventure.my.id/storage/${penyewaans.produk && penyewaans.produk.produk_photo_path}`} className="max-h-[400px] rounded-lg  transition duration-300" alt="" />
          </div>
        </div>
        <div className="text-start ms-5 mt-5">
          <h1 className="text-3xl font-bold">{penyewaans.produk && penyewaans.produk.nama_produk}</h1>
          <h2 className="text-sm text-gray-700 my-2">{penyewaans.status}</h2>
          <p>{penyewaans.keterangan}</p>
          <h1 className="text-2xl font-bold mt-2">Rp.{new Intl.NumberFormat('id-ID').format(penyewaans.total)}</h1>
          {penyewaans.status === 'PENDING' ? (
            <a href={penyewaans.payment_url} className="btn  btn-gray-500 btn-xs mr-4" target="_blank">
              Bayar
            </a>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

export default PenyewaanDetails;
