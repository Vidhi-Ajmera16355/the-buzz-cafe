import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

export default function Dashboard() {
  const [stats, setStats] = useState({ reservations: 0, inquiries: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        const [resRes, inqRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/reservations`, config),
          axios.get(`${API_BASE_URL}/inquiries`, config)
        ]);
        setStats({ reservations: resRes.data.length, inquiries: inqRes.data.length });
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-md">
          <h3 className="text-muted-foreground text-sm font-bold uppercase mb-2">Total Reservations</h3>
          <p className="text-4xl font-bold">{stats.reservations}</p>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-md">
          <h3 className="text-muted-foreground text-sm font-bold uppercase mb-2">Total Inquiries</h3>
          <p className="text-4xl font-bold">{stats.inquiries}</p>
        </div>
      </div>
    </div>
  );
}
