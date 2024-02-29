import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  const [penyewaans, setPenyewaans] = useState([]);
  const accessToken = localStorage.getItem('access_token');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPenyewaans = async () => {
      const response = await fetch('https://goadventure.my.id/api/penyewaan', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setPenyewaans(data.data.data);
      setLoading(false);
    };
    fetchPenyewaans();
  }, []);

  const formatTanggal = (tanggal) => {
    const options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };

    return new Intl.DateTimeFormat('id-ID', options).format(tanggal);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && penyewaans.length === 0 ? (
        <p>Tidak tersedia...</p>
      ) : (
        <>
          <h2 className="text-2xl font-bold py-3">History</h2>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-center">
                  <th>Produk</th>
                  <th>Tanggal</th>
                  <th>Nama User</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                {penyewaans.map((penyewaan) => {
                  return (
                    <tr key={penyewaan.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={`https://goadventure.my.id/storage/${penyewaan.produk && penyewaan.produk.produk_photo_path}`} alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{penyewaan.produk && penyewaan.produk.nama_produk}</div>
                            <div className="text-sm opacity-50">{penyewaan.produk && penyewaan.produk.kategori && penyewaan.produk.kategori.nama_kategori}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        {/* {formatTanggal(new Date(penyewaan.tgl_sewa))} */}
                        <span className="badge-sm">Sewa : {formatTanggal(new Date(penyewaan.tgl_sewa))}</span>
                        <br />
                        <span className="badge-sm">Kembali : {formatTanggal(new Date(penyewaan.tgl_kembali))}</span>
                      </td>
                      <td className="text-center">
                        {penyewaan.user && penyewaan.user.nama}
                        <br />
                        <span className="badge badge-ghost badge-sm">{penyewaan.user && penyewaan.user.email}</span>
                      </td>
                      <td className="text-center">Rp.{new Intl.NumberFormat('id-ID').format(penyewaan.total)}</td>
                      <td className="text-center">{penyewaan.status}</td>
                      <th className="text-center">
                        {penyewaan.status === 'PENDING' ? (
                          <a href={penyewaan.payment_url} className="btn  btn-gray-500 btn-xs mr-4" target="_blank">
                            Bayar
                          </a>
                        ) : (
                          ''
                        )}
                        <Link to={`/penyewaan/${penyewaan.id}`}>
                          <h2 className="btn  btn-gray-500 btn-xs">Detail</h2>
                        </Link>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default History;
