import { useState, useEffect } from "react";
import { getContacts, updateContact } from "../../../_services/contacts";

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [activeMessageId, setActiveMessageId] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const allMessages = await getContacts();
      setMessages(allMessages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error("Failed to load messages", error);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMessageId) return;

    try {
      await updateContact(activeMessageId, {
        reply: replyText,
        read_by_user: false, // So user will see a notification
        status: 'replied'
      });

      setReplyText("");
      setActiveMessageId(null);
      loadMessages();
      alert("Balasan terkirim!");
    } catch (error) {
      alert("Gagal mengirim balasan.");
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Pesan Masuk</h3>
      </div>
      
      <div className="flow-root mt-6">
        {messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Belum ada pesan.</p>
        ) : (
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((msg) => (
              <li key={msg.id} className="py-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {msg.name} ({msg.email})
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {new Date(msg.created_at).toLocaleString('id-ID')}
                      </p>
                      <p className="mt-2 text-base font-semibold text-gray-900 dark:text-white">
                        Subjek: {msg.subject}
                      </p>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {msg.message}
                      </p>
                    </div>
                  </div>

                  {/* Reply Section */}
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    {msg.reply ? (
                      <div>
                        <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-1">Balasan Anda:</p>
                        <p className="text-sm text-gray-800 dark:text-gray-200">{msg.reply}</p>
                      </div>
                    ) : (
                      <>
                        {activeMessageId === msg.id ? (
                          <form onSubmit={handleReply}>
                            <textarea
                              rows="3"
                              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2 border mb-2 text-sm"
                              placeholder="Tulis balasan..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              required
                            ></textarea>
                            <div className="flex space-x-2">
                              <button
                                type="submit"
                                className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
                              >
                                Kirim Balasan
                              </button>
                              <button
                                type="button"
                                onClick={() => setActiveMessageId(null)}
                                className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                              >
                                Batal
                              </button>
                            </div>
                          </form>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveMessageId(msg.id);
                              setReplyText("");
                            }}
                            className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                          >
                            Balas
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
