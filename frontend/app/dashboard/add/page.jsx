"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    const t = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];

    if (!t) return (window.location.href = "/");
    setToken(t);
  }, []);

  const addExpense = async () => {
    if(title === ""){
        toast("Title Cannot be empty" ,{
            icon: '⚠️',
            style: {
                background: '#fffae6',
                color: '#ff9800',
            },
        })
        return
    }
    if(amount === ""){
        toast("Amount Cannot be empty",{
            icon: '⚠️',
            style: {
                background: '#fffae6',
                color: '#ff9800',
            },
        })
        return
    }
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense`,
      { title, amount },
      { headers: { Authorization: token } }
    );

    setTitle("");
    setAmount("");
    toast.success("Expense added!");
  };

  return (
    <div className="flex flex-col gap-3 w-[40%] bg-purple-300 p-5 rounded shadow">
      <h1 className="text-xl font-bold mb-3">Add Expense</h1>
    <div className="flex flex-col gap-2">
        <label className="text-md text-white font-bold">Enter Expanse Title:</label>
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
            className="border p-2 w-full mb-2 rounded bg-white text-black focus-visible:border-purple-700"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
        />
    </div>
      
    <div className="flex justify-center w-full">
      <button
        onClick={addExpense}
        className="bg-purple-700 text-white font-bold w-[30%] py-2 rounded border-purple-300 **transition duration-600** hover:bg-white hover:text-purple-300 hover:border-purple-700"
      >
        Add Expense
      </button>
      </div>
    </div>
  );
}