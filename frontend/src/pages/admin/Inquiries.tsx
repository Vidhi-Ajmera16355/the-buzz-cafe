import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const API = API_BASE_URL;

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "Pending" | "Resolved";
  createdAt: string;
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const token = localStorage.getItem("adminToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchInquiries = async () => {
    try {
      const { data } = await axios.get(`${API}/inquiries`, config);
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id: string) => {
    try {
      await axios.put(`${API}/inquiries/${id}/status`, { status: "Resolved" }, config);
      setInquiries((prev) => prev.map((inq) => inq._id === id ? { ...inq, status: "Resolved" } : inq));
      if (selected?._id === id) setSelected({ ...selected, status: "Resolved" });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchInquiries(); }, []);

  const filtered = inquiries.filter((inq) =>
    inq.name.toLowerCase().includes(search.toLowerCase()) ||
    inq.subject.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 flex gap-8">
      {/* Left Panel */}
      <div className="flex-1">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Inquiries</h1>
            <p className="text-gray-500 mt-1">Contact form submissions from visitors.</p>
          </div>
          <span className="bg-[#3B2416] text-white px-4 py-2 rounded-full text-sm font-bold">
            {inquiries.filter(i => i.status === "Pending").length} Pending
          </span>
        </div>

        <input
          type="text"
          placeholder="Search..."
          className="w-full max-w-sm border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#C68642] mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((inq) => (
              <div
                key={inq._id}
                onClick={() => setSelected(inq)}
                className={`bg-white p-5 rounded-2xl border cursor-pointer transition-all ${
                  selected?._id === inq._id
                    ? "border-[#C68642] shadow-md"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{inq.name}</h3>
                    <p className="text-gray-400 text-xs">{inq.email}</p>
                    <p className="text-gray-700 text-sm mt-1 font-medium">{inq.subject}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full flex-shrink-0 ${
                    inq.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {inq.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Panel - Message Detail */}
      {selected && (
        <div className="w-96 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sticky top-8">
            <h2 className="text-xl font-bold mb-1">{selected.subject}</h2>
            <p className="text-sm text-gray-400 mb-6">
              From: <span className="font-medium text-gray-700">{selected.name}</span> ({selected.email})
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 leading-relaxed mb-8">
              {selected.message}
            </div>
            {selected.status === "Pending" && (
              <button
                onClick={() => markResolved(selected._id)}
                className="w-full bg-[#3B2416] text-white py-3 rounded-xl font-bold hover:bg-[#3B2416]/90 transition-colors"
              >
                Mark as Resolved
              </button>
            )}
            {selected.status === "Resolved" && (
              <div className="text-center text-green-600 font-bold">✓ Resolved</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
