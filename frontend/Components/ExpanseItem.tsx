"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import EditModal from "./EditModal";
import { deleteExpense } from "../app/dashboard/action";

export type Expense = {
  _id: string;
  title: string;
  amount: number;
  date?: string;
  createdAt: string;
};

type ExpenseItemProps = {
  expense: Expense;
};

export default function ExpanseItem({expense}: ExpenseItemProps  ) {
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      await deleteExpense(expense._id);
      toast.success("Expense deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <>
      <div className="bg-white p-3 rounded shadow mb-2 flex flex-col justify-center">
        <span className="text-black text-sm ml-2">
            {new Date(expense.date ?? expense.createdAt).toLocaleDateString("en-IN")}
        </span>
        <div className="flex justify-center flex-col items-center w-[100%] gap-3">
            <span className="text-black text-sm ml-2">
        {expense.title}
        
        </span>
        <span className="text-black text-sm ml-2">
         ₹{expense.amount}
        </span>
        </div>
        
        <div className="space-x-3">
          <button onClick={() => setEditing(true)} className="text-blue-500">Edit</button>
          <button onClick={handleDelete} className="text-red-500">Delete</button>
        </div>
      </div>

      {editing && <EditModal expense={expense} onClose={() => setEditing(false)} />}
    </>
  );
}