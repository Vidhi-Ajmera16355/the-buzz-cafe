import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const API = API_BASE_URL;

type Reservation = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  specialRequest?: string;
  status: "Pending" | "Contacted" | "Confirmed" | "Rejected";
  createdAt: string;
};

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Contacted: "bg-blue-100 text-blue-800",
  Confirmed: "bg-green-100 text-green-800",
  Rejected: "bg-red-100 text-red-800",
};

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("adminToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchReservations = async () => {
    try {
      const { data } = await axios.get(`${API}/reservations`, config);
      setReservations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { data } = await axios.put(`${API}/reservations/${id}/status`, { status }, config);
      setReservations((prev) => prev.map((r) => (r._id === id ? data : r)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  const filtered = reservations.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) || r.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reservations</h1>
          <p className="text-gray-500 mt-1">Manage and respond to table booking requests.</p>
        </div>
        <span className="bg-[#3B2416] text-white px-4 py-2 rounded-full text-sm font-bold">
          {reservations.length} Total
        </span>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full max-w-sm border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#C68642]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No reservations found.</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Guest</th>
                <th className="px-6 py-4 text-left">Date & Time</th>
                <th className="px-6 py-4 text-left">Guests</th>
                <th className="px-6 py-4 text-left">Special Request</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r._id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    <div className="text-gray-400 text-xs">{r.email}</div>
                    <div className="text-gray-400 text-xs">{r.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{new Date(r.date).toLocaleDateString()}</div>
                    <div className="text-gray-400">{r.time}</div>
                  </td>
                  <td className="px-6 py-4 font-bold">{r.guests}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-[200px] truncate">{r.specialRequest || "—"}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={r.status}
                      onChange={(e) => updateStatus(r._id, e.target.value)}
                      className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-[#C68642] bg-white"
                    >
                      <option>Pending</option>
                      <option>Contacted</option>
                      <option>Confirmed</option>
                      <option>Rejected</option>
                    </select>
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
