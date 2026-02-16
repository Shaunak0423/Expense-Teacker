"use client";
import { useState } from "react";
import axios from "axios";

export default function EditModal({ expense, token, onClose, onUpdated }) {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);

  const updateExpense = async () => {
    await axios.put(
      `${NEXT_PUBLIC_BACKEND_URL}/api/expense/${expense._id}`,
      { title, amount },
      { headers: { Authorization: token } }
    );

    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-80">
        <h2 className="text-lg font-bold mb-3">Edit Expense</h2>

        <input
          className="border p-2 w-full mb-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-2"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button onClick={updateExpense} className="bg-blue-500 text-white px-3 py-1 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}