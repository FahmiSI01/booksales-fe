import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  showTransactions,
  updateTransactions,
} from "../../../_services/transactions";

export default function TransactionEdit() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    order_number: "",
    customer_id: "",
    book_id: "",
    total_amount: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await showTransactions(id);

        setFormData({
          order_number: data.order_number || "",
          customer_id: data.customer_id || "",
          book_id: data.book_id || "",
          total_amount: data.total_amount || "",
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateTransactions(id, formData);

      alert("Transaction updated successfully");

      navigate("/admin/transactions");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
          Edit Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Order Number
            </label>

            <input
              type="text"
              name="order_number"
              value={formData.order_number}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Customer ID
            </label>

            <input
              type="number"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Book ID
            </label>

            <input
              type="number"
              name="book_id"
              value={formData.book_id}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Total Amount
            </label>

            <input
              type="number"
              name="total_amount"
              value={formData.total_amount}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Update Transaction
          </button>

        </form>
      </div>
    </section>
  );
}