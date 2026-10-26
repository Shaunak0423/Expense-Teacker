"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateExpense } from "../app/dashboard/action"

export default function EditModal({ expense, onClose }) {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [date, setDate] = useState(
    new Date(expense.date || expense.createdAt).toISOString().split("T")[0]
  );

  const handleSave = async () => {
    if (title.trim() === "" || amount === "") {
      return toast.error("Title and amount are required");
    }
    try {
      await updateExpense(expense._id, title, Number(amount), date);
      toast.success("Expense updated");
      onClose();
    } catch {
      toast.error("Failed to update");
    }
  };

  const today = new Date().toISOString().split("T")[0]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow w-[90%] max-w-sm flex flex-col gap-3">
        <h2 className="text-lg font-bold text-black">Edit Expense</h2>
        <input
          className="border p-2 rounded text-black"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 rounded text-black"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full mb-2 rounded bg-white text-black"
          value={date}
          max={today}
          onChange={e => setDate(e.target.value)}
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="text-gray-600">Cancel</button>
          <button onClick={handleSave} className="bg-purple-700 text-white px-4 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}