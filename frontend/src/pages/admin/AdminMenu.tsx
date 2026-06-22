import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2 } from "lucide-react";

const API = "http://localhost:5000/api";

type MenuItem = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: { _id: string; name: string } | string;
  image?: string;
  isAvailable: boolean;
};

type Category = { _id: string; name: string };

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "", category: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("adminToken");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchAll = async () => {
    try {
      const [itemRes, catRes] = await Promise.all([
        axios.get(`${API}/menu/items`),
        axios.get(`${API}/menu/categories`),
      ]);
      setItems(itemRes.data);
      setCategories(catRes.data);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = new FormData();
      form.append("name", newItem.name);
      form.append("description", newItem.description);
      form.append("price", newItem.price);
      form.append("category", newItem.category);
      if (imageFile) form.append("image", imageFile);

      await axios.post(`${API}/menu/items`, form, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setShowForm(false);
      setNewItem({ name: "", description: "", price: "", category: "" });
      fetchAll();
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await axios.delete(`${API}/menu/items/${id}`, config);
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  useEffect(() => { fetchAll(); }, []);

  const getCategoryName = (cat: MenuItem["category"]) =>
    typeof cat === "string" ? cat : cat?.name;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Menu Management</h1>
          <p className="text-gray-500 mt-1">Add, view, or remove menu items.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#3B2416] text-white px-6 py-3 rounded-full font-bold hover:bg-[#3B2416]/90 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 grid grid-cols-2 gap-4">
          <input required placeholder="Item Name" className="col-span-2 border border-gray-200 rounded-lg px-4 py-2.5" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
          <textarea placeholder="Description" className="col-span-2 border border-gray-200 rounded-lg px-4 py-2.5" value={newItem.description} onChange={e => setNewItem({...newItem, description: e.target.value})} />
          <input required type="number" placeholder="Price (₹)" className="border border-gray-200 rounded-lg px-4 py-2.5" value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
          <select required className="border border-gray-200 rounded-lg px-4 py-2.5" value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
            <option value="">Select Category</option>
            {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
          <input type="file" accept="image/*" className="col-span-2" onChange={e => setImageFile(e.target.files?.[0] || null)} />
          <div className="col-span-2 flex gap-4">
            <button disabled={submitting} type="submit" className="bg-[#3B2416] text-white px-6 py-2.5 rounded-lg font-bold">
              {submitting ? "Adding..." : "Save Item"}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-gray-200 px-6 py-2.5 rounded-lg font-bold">Cancel</button>
          </div>
        </form>
      )}

      {/* Items Table */}
      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Item</th>
                <th className="px-6 py-4 text-left">Category</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-gray-400 text-xs max-w-[200px] truncate">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{getCategoryName(item.category)}</td>
                  <td className="px-6 py-4 font-bold text-[#C68642]">₹{item.price}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {item.isAvailable ? "Available" : "Unavailable"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-600 transition-colors p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
