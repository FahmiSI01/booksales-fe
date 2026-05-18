import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createTransactions, updateTransactions, getMidtransToken } from "../../../_services/transactions";
import { removeCartItem } from "../../../_services/carts";
import Swal from "sweetalert2";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("transfer");

  const items = location.state?.items || [];
  const source = location.state?.source || "direct"; // 'cart' or 'direct'

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Tidak ada barang untuk dibayar.</p>
          <button onClick={() => navigate("/books")} className="text-indigo-600 hover:underline">Kembali ke Belanja</button>
        </div>
      </div>
    );
  }

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const parsedItems = items.map(item => {
    // Determine if it's from cart API (has nested .book) or direct buy
    const bookData = item.book || item; 
    return {
      cartItemId: item.book ? item.id : null,
      bookId: item.book_id || item.bookId || bookData.id,
      title: bookData.title,
      price: bookData.price,
      quantity: item.quantity,
      image: bookData.cover_photo?.startsWith("http") ? bookData.cover_photo : (bookData.cover_photo ? `http://127.0.0.1:8000/storage/${bookData.cover_photo}` : item.image)
    };
  });

  const total = parsedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const orderNumber = "TRX-" + new Date().getTime();
      const createdTransactionIds = [];

      const paymentTypeMap = {
        transfer: "bank_transfer",
        ewallet: "gopay",
        qris: "qris"
      };
      const paymentType = paymentTypeMap[paymentMethod] || paymentMethod;

      // 1. Simpan transaksi ke database sebagai PENDING dulu
      for (const item of parsedItems) {
        const createPayload = {
          order_number: orderNumber,
          book_id: item.bookId,
          quantity: item.quantity,
          payment_method: paymentMethod,
          status: 'pending',
          payment_status: 'unpaid'
        };
        const trxRes = await createTransactions(createPayload);
        const transactionId = trxRes?.data?.id || trxRes?.id;
        if (transactionId) {
          createdTransactionIds.push(transactionId);
        }

        if (source === "cart" && item.cartItemId) {
          try { await removeCartItem(item.cartItemId); } catch(err) { console.warn("Gagal hapus item cart:", err); }
        }
      }

      // 2. Minta token Midtrans
      const midtransItems = parsedItems.map(item => ({
        id: item.bookId,
        price: item.price,
        quantity: item.quantity,
        name: item.title
      }));
      midtransItems.push({ id: 'FEE-01', price: 2000, quantity: 1, name: 'Biaya Layanan' });

      const tokenPayload = {
        order_number: orderNumber,
        total: total + 2000,
        items: midtransItems,
        payment_type: paymentType
      };

      const res = await getMidtransToken(tokenPayload);
      const snapToken = res?.token || res?.data?.token;
      if (!snapToken) {
        console.error("Midtrans token response not valid:", res);
        throw new Error("Tidak menerima token Midtrans dari server.");
      }

      // 3. Buka popup Midtrans
      if (window.snap && typeof window.snap.pay === "function") {
        try {
          window.snap.pay(snapToken, {
            onSuccess: async function(result) {
              try {
                for (const id of createdTransactionIds) {
                  await updateTransactions(id, { status: 'success', payment_status: 'paid' });
                }
                Swal.fire('Berhasil!', 'Pembayaran berhasil! Terima kasih telah berbelanja.', 'success').then(() => navigate("/transactions"));
              } catch (updateError) {
                console.error("Update transaksi gagal:", updateError);
                Swal.fire('Sukses bayar', 'Pembayaran berhasil, tetapi status transaksi gagal diperbarui. Silakan cek riwayat transaksi atau hubungi admin.', 'warning').then(() => navigate("/transactions"));
              } finally {
                setLoading(false);
              }
            },
            onPending: function(result) {
              setLoading(false);
              Swal.fire('Menunggu', 'Pesanan masuk riwayat (Pending). Selesaikan pembayaran untuk memproses.', 'info').then(() => navigate("/transactions"));
            },
            onError: function(result) {
              setLoading(false);
              Swal.fire('Gagal', 'Pembayaran gagal!', 'error').then(() => navigate("/transactions"));
            },
            onClose: function() {
              setLoading(false);
              Swal.fire('Dibatalkan', 'Pesanan disimpan di riwayat (Pending).', 'warning').then(() => navigate("/transactions"));
            }
          });
        } catch (snapError) {
          console.error("Midtrans snap.pay error:", snapError);
          Swal.fire('Error', 'Pembayaran Midtrans gagal dibuka.', 'error');
          setLoading(false);
        }
      } else {
        Swal.fire('Error', 'Script Midtrans belum dimuat dengan sempurna.', 'error');
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      Swal.fire('Error', error.message || 'Gagal memproses pesanan.', 'error');
      setLoading(false);
    }
  };

  // processCheckoutSuccess dihapus karena logikanya sudah disatukan di onSuccess di atas

  return (
    <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-16 min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center sm:text-left">Pembayaran</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Ringkasan Pesanan */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-4 border-gray-200 dark:border-gray-700">Ringkasan Pesanan</h3>
              <div className="space-y-4">
                {parsedItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <img className="w-12 h-16 object-cover rounded" src={item.image} alt={item.title} />
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Rp. {item.price} x {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">Rp. {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 border-b pb-4 border-gray-200 dark:border-gray-700">Metode Pembayaran</h3>
              
              <div className="space-y-4">
                <label className={`flex flex-col sm:flex-row items-start sm:items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'transfer' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}>
                  <div className="flex items-center w-full">
                    <input type="radio" name="payment" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500" />
                    <div className="ml-4 w-full">
                      <span className="block font-bold text-gray-900 dark:text-white text-base">Transfer Bank (Virtual Account)</span>
                      <div className="flex gap-3 mt-3 items-center flex-wrap">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" className="h-5 object-contain opacity-90" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bank_Negara_Indonesia_logo_%282004%29.svg/500px-Bank_Negara_Indonesia_logo_%282004%29.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20250516061934" alt="BNI" className="h-4 object-contain opacity-90" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Logo_BRI.png" alt="BRI" className="h-5 object-contain opacity-90" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/500px-Bank_Mandiri_logo_2016.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20211228163717" alt="Mandiri" className="h-4 object-contain opacity-90" />
                      </div>
                    </div>
                  </div>
                </label>

                <label className={`flex flex-col sm:flex-row items-start sm:items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'ewallet' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}>
                  <div className="flex items-center w-full">
                    <input type="radio" name="payment" value="ewallet" checked={paymentMethod === 'ewallet'} onChange={() => setPaymentMethod('ewallet')} className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500" />
                    <div className="ml-4 w-full">
                      <span className="block font-bold text-gray-900 dark:text-white text-base">E-Wallet</span>
                      <div className="flex gap-4 mt-3 items-center flex-wrap">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" alt="Gopay" className="h-5 object-contain opacity-90" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/1280px-Logo_ovo_purple.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20210603100330" alt="OVO" className="h-4 object-contain opacity-90" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" alt="DANA" className="h-5 object-contain opacity-90" />
                      </div>
                    </div>
                  </div>
                </label>
                
                <label className={`flex flex-col sm:flex-row items-start sm:items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${paymentMethod === 'qris' ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'}`}>
                  <div className="flex items-center w-full">
                    <input type="radio" name="payment" value="qris" checked={paymentMethod === 'qris'} onChange={() => setPaymentMethod('qris')} className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500" />
                    <div className="ml-4 flex items-center justify-between w-full">
                      <span className="block font-bold text-gray-900 dark:text-white text-base">QRIS (Scan Barcode)</span>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-6 object-contain" />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Konfirmasi Pembayaran */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Total Pembayaran</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal Barang</span>
                  <span className="font-medium text-gray-900 dark:text-white">Rp. {total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Biaya Layanan</span>
                  <span className="font-medium text-gray-900 dark:text-white">Rp. 2000</span>
                </div>
                <div className="border-t pt-4 border-gray-200 dark:border-gray-700 flex justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total Tagihan</span>
                  <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">Rp. {total + 2000}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading}
                className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-lg px-5 py-3.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 disabled:opacity-50 transition-colors shadow-lg shadow-indigo-500/30"
              >
                {loading ? "Memproses..." : "Bayar Sekarang"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
