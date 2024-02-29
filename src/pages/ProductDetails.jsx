import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTimes } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://goadventure.my.id/api/produk/${id}`);
      const data = await response.json();
      //   console.log(data.data.data);
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && endDate < date) {
      setEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    const maxEndDate = new Date(startDate);
    maxEndDate.setDate(maxEndDate.getDate() + 7);

    if (date >= startDate && date <= maxEndDate) {
      setEndDate(date);
    } else {
      // alert('Sewa akhir harus setelah atau maksimal 7 hari dari sewa awal!');
      swal('Tanggal Tidak Sesuai', 'Silakan pilih tanggal sewa awal dan sewa akhir.', 'error');
    }
  };

  const clearStartDate = () => {
    setStartDate(null);
  };

  const clearEndDate = () => {
    setEndDate(null);
  };

  const calculateTotalDays = () => {
    if (startDate instanceof Date && endDate instanceof Date) {
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const totalDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return totalDays;
    }
    return 0;
  };

  const formatDatetime = (date) => {
    return date.toISOString().slice(0, 19).replace('T', ' '); // Format to 'Y-m-d H:i:s'
  };

  const token = localStorage.getItem('access_token');

  const user = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    if (!startDate || !endDate) {
      swal('Tanggal Tidak Sesuai', 'Silakan pilih tanggal sewa awal dan sewa akhir.', 'error');
      setLoading(true);
      return; // Hentikan eksekusi fungsi jika tanggal belum dipilih
    }
    if (!token) {
      swal('Warning!', 'Silahkan Login Dahulu!', 'warning');
      setLoading(true);
    } else {
      const formattedStartDate = startDate ? formatDatetime(startDate) : null;
      const formattedEndDate = endDate ? formatDatetime(endDate) : null;

      // Lakukan sesuatu dengan data formulir (misalnya, kirim ke server)
      // console.log('Data formulir:', {
      //   idProduk: products.id,
      //   startDate: formattedStartDate,
      //   endDate: formattedEndDate,
      //   totalDays: calculateTotalDays(),
      //   totalHarga: products.harga * calculateTotalDays(),
      //   idUser: user.id,
      //   status: 'PENDING',
      // });

      const checkoutData = {
        id_produk: products.id,
        tgl_sewa: formattedStartDate,
        tgl_kembali: formattedEndDate,
        total_hari: calculateTotalDays(),
        total: products.harga * calculateTotalDays(),
        id_user: user.id,
        status: 'PENDING',
      };

      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        console.error('Access token tidak ditemukan di localStorage.');
        return;
      }

      try {
        const response = await fetch('https://goadventure.my.id/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(checkoutData),
        });

        if (response.ok) {
          console.log('Data berhasil dikirim ke API.');
          // swal('Success', 'Berhasil Checkout');
          swal('Success', 'Berhasil Checkout, Silahkan menuju ke Pembayaran', 'success', {
            buttons: false,
            timer: 2000,
          }).then((value) => {
            window.location.href = '/history';
          });
          // Lakukan sesuatu setelah berhasil mengirim data
        } else {
          console.error('Gagal mengirim data ke API:', response.statusText);
          // Lakukan sesuatu jika terjadi kesalahan
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
        // Tangani kesalahan yang terjadi selama proses pengiriman data
      }
    }
  };

  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <a href={'/'}>Home</a>
          </li>
          <li>
            <Link to={'/category'}>Products</Link>
          </li>
          <li>{products.nama_produk}</li>
        </ul>
      </div>
      <div className="grid md:grid-cols-3 mt-5">
        <div>
          <div className="w-full mx-auto flex justify-center items-center">
            <img src={`https://goadventure.my.id/storage/${products.produk_photo_path}`} className="max-h-[400px] rounded-lg  transition duration-300" alt="" />
          </div>
        </div>
        <div className="text-start ms-5 mt-5">
          <h1 className="text-3xl font-bold">{products.nama_produk}</h1>
          <h2 className="text-sm text-gray-700 my-2">{products.kategori && products.kategori.nama_kategori}</h2>
          <p>{products.keterangan}</p>
          <h1 className="text-2xl font-bold mt-2">Rp.{new Intl.NumberFormat('id-ID').format(products.harga)}</h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 mt-5">
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 me-2">Sewa Awal:</label>
                <DatePicker selected={startDate} onChange={handleStartDateChange} minDate={new Date()} className="border border-gray-300 p-1" />
                {startDate && (
                  <button onClick={clearStartDate} className="ml-2 text-red-500 focus:outline-none">
                    <FaTimes />
                  </button>
                )}
              </div>

              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 me-2">Sewa Akhir:</label>
                <DatePicker selected={endDate} onChange={handleEndDateChange} minDate={startDate} maxDate={new Date(startDate?.getTime() + 7 * 24 * 60 * 60 * 1000)} className="border border-gray-300 p-1" />
                {endDate && (
                  <button onClick={clearEndDate} className="ml-2 text-red-500 focus:outline-none">
                    <FaTimes />
                  </button>
                )}
              </div>

              {endDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Hari Sewa:</label>
                  <span className="inline-block font-semibold">{calculateTotalDays()}</span>
                </div>
              )}
            </div>
            {loading ? (
              <button type="submit" className="btn btn-gray-500 mt-5 w-full">
                Sewa Sekarang
              </button>
            ) : (
              <button disabled className="btn btn-gray-500 mt-5 w-full">
                Sewa Sekarang
              </button>
            )}
          </form>
          {/* Modal */}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
