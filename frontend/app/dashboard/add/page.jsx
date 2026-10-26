"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { addExpense } from "../action"; // adjust path if needed

const warn = {
  icon: "⚠️",
  style: { background: "#fffae6", color: "#ff9800" },
};

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
  const handleAdd = async () => {
    if (title.trim() === "") return toast("Title cannot be empty", warn);
    if (amount === "") return toast("Amount cannot be empty", warn);

    try {
      await addExpense(title, Number(amount), date);
      setTitle("");
      setAmount("");
      setDate(today);
      toast.success("Expense added!");
    } catch {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="flex flex-col gap-3 w-[40%] h-[50%] bg-purple-300 p-5 rounded shadow">
      <h1 className="text-xl font-bold mb-3">Add Expense</h1>

      <div className="flex flex-col gap-2">
        <label className="text-md text-white font-bold">Enter Expense Title:</label>
        <input
          className="border p-2 w-full mb-2 rounded bg-white text-black focus-visible:border-purple-700"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md text-white font-bold">Enter Amount:</label>
        <input
          type="number"
          className="border p-2 w-full mb-2 rounded bg-white text-black focus-visible:border-purple-700"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-md text-white font-bold">Date:</label>
        <input
          type="date"
          className="border p-2 w-full mb-2 rounded bg-white text-black"
          value={date}
          max={today}
          onChange={e => setDate(e.target.value)}
        />
      </div>

      <div className="flex justify-center w-full">
        <button
          onClick={handleAdd}
          className="bg-purple-700 text-white font-bold w-[30%] py-2 rounded border-purple-300 transition duration-500 hover:bg-white hover:text-purple-300 hover:border-purple-700"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}