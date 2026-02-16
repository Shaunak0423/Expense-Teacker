"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import EditModal from "../../Components/EditModal";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [token, setToken] = useState(null);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    const t = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (!t) return (window.location.href = "/");
    setToken(t);
  }, []);

  const fetchExpenses = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense`, {
      headers: { Authorization: token },
    });
    setExpenses(res.data);
  };

  useEffect(() => {
    if (token) fetchExpenses();
  }, [token]);

  const deleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense/${id}`, {
      headers: { Authorization: token },
    });

    fetchExpenses();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">All Expenses</h1>

      {expenses.map(e => (
        <div key={e._id} className="bg-white p-3 rounded shadow mb-2 flex justify-between">
          <span>{e.title} - ₹{e.amount}</span>
          <div className="space-x-3">
            <button onClick={() => setEditExpense(e)} className="text-blue-500">
              Edit
            </button>
            <button onClick={() => deleteExpense(e._id)} className="text-red-500">
              Delete
            </button>
          </div>
        </div>
      ))}

      {editExpense && (
        <EditModal
          expense={editExpense}
          token={token}
          onClose={() => setEditExpense(null)}
          onUpdated={fetchExpenses}
        />
      )}
    </div>
  );
}