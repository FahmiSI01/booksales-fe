import { useEffect, useState } from "react";

export default function UserTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo") || "{}");
    if (!user.id) return;

    const allTransactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );

    const userTransactions = allTransactions.filter(
      (item) => item.userId === user.id
    );

    setTransactions(userTransactions);
  }, []);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Riwayat Transaksi
      </h1>

      {transactions.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          Belum ada transaksi
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
          <table className="w-full text-sm text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-4 py-3">Buku</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Harga Satuan</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Tanggal</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium">{t.bookTitle}</td>

                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {t.quantity} pcs
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {formatRupiah(t.price)}
                  </td>

                  <td className="px-4 py-3 font-semibold text-indigo-600">
                    {formatRupiah(t.total)}
                  </td>

                  <td className="px-4 py-3 text-gray-500">{t.date}</td>

                  <td className="px-4 py-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-semibold">
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}