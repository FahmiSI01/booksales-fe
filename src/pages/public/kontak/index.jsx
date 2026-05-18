import { useState, useEffect } from "react";
import { getContacts, createContact, updateContact } from "../../../_services/contacts";

export default function Kontak() {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [myMessages, setMyMessages] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  useEffect(() => {
    loadMessages();
  }, [userInfo?.id]);

  const loadMessages = async () => {
    if (!userInfo?.id) return;
    
    try {
      const allMessages = await getContacts();
      // Only keep messages for the current user
      const userMessages = allMessages.filter(m => m.user_id === userInfo.id);
      
      // Check and update read status if there's a reply
      const unreadReplies = userMessages.filter(m => m.reply && !m.read_by_user);
      
      if (unreadReplies.length > 0) {
        // Mark them as read in the backend
        await Promise.all(unreadReplies.map(m => 
          updateContact(m.id, { read_by_user: true })
        ));
        
        // Update local state temporarily so we don't have to refetch immediately
        const updatedMessages = userMessages.map(m => {
          if (m.reply && !m.read_by_user) return { ...m, read_by_user: true };
          return m;
        });
        setMyMessages(updatedMessages);
      } else {
        setMyMessages(userMessages);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInfo?.id) {
      alert("Silakan login terlebih dahulu untuk mengirim pesan.");
      return;
    }

    try {
      const payload = {
        user_id: userInfo.id,
        name: userInfo.name,
        email: userInfo.email,
        subject,
        message,
      };

      await createContact(payload);

      setSubject("");
      setMessage("");
      loadMessages();
      alert("Pesan berhasil dikirim!");
    } catch (error) {
      alert("Gagal mengirim pesan, pastikan semua kolom terisi dengan benar.");
    }
  };

  // formatting date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans flex flex-col">
      {/* Header Banner */}
      <div className="bg-white dark:bg-gray-800 pt-8 pb-10 text-center px-4 border-b border-gray-100 dark:border-gray-700">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">Hubungi Kami</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto text-base leading-relaxed">
          Ada pertanyaan atau saran? Tim kami siap mendengarkan.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

          {/* Form Section */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center mr-3 text-indigo-600 dark:text-indigo-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </span>
              Kirim Pesan Kepada Admin
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Subjek Pesan</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Contoh: Info Pemesanan Buku"
                  className="block w-full rounded-xl border-gray-200 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:bg-gray-700 dark:text-white px-4 py-2 bg-gray-50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Detail Pesan</label>
                <textarea
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tuliskan pertanyaan atau keluhan Anda..."
                  className="block w-full rounded-xl border-gray-200 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900 dark:bg-gray-700 dark:text-white px-4 py-2 bg-gray-50 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 px-4 mt-2 border border-transparent rounded-xl shadow-md shadow-indigo-200 dark:shadow-none text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                Kirim Pesan Sekarang
              </button>
            </form>
          </div>

          {/* Chat History Section */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 h-full flex flex-col">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center border-b border-gray-100 dark:border-gray-700 pb-3">
                <span className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mr-3 text-purple-600 dark:text-purple-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
                </span>
                Riwayat Pesan
              </h2>

              {!userInfo?.id ? (
                <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
                  <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-5">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Akses Terkunci</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-base max-w-sm">Silakan login terlebih dahulu untuk melihat dan memantau riwayat pesan atau pertanyaan Anda kepada admin.</p>
                </div>
              ) : myMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
                  <div className="w-24 h-24 bg-indigo-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-5">
                    <svg className="w-12 h-12 text-indigo-300 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum Ada Pesan</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-base max-w-sm">Jika Anda memiliki kendala atau ingin bertanya sesuatu, silakan gunakan form di sebelah kiri.</p>
                </div>
              ) : (
                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1 max-h-[350px]">
                  {myMessages.slice().reverse().map(msg => (
                    <div key={msg.id} className="bg-gray-50 dark:bg-gray-700/30 rounded-2xl p-4 border border-gray-100 dark:border-gray-600">

                      {/* User Message Bubble */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                            {msg.subject}
                          </span>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {formatDate(msg.created_at)}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{msg.message}</p>
                      </div>

                      {/* Admin Reply Bubble */}
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                        {msg.reply ? (
                          <div className="flex gap-3 items-start bg-indigo-50/80 dark:bg-indigo-900/30 p-3 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                            <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                              A
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-0.5 flex items-center">
                                Balasan Tim Support
                                <svg className="w-3 h-3 ml-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                              </p>
                              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">{msg.reply}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-yellow-600 dark:text-yellow-500 text-sm font-medium bg-yellow-50 dark:bg-yellow-900/20 px-4 py-3 rounded-xl border border-yellow-100 dark:border-yellow-800/30">
                            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            Pesan Anda sedang menunggu tanggapan Admin.
                          </div>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
