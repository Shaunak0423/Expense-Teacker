import { addExpense } from "../app/dashboard/action";

export default function AddExpenseComponent() {
  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      action={addExpense}
      className="flex flex-col gap-3 w-[50%] h-[65%] bg-purple-300 p-5 rounded shadow"
    >
      <h1 className="text-xl font-bold mb-3">Add Expense</h1>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="text-md text-white font-bold">Enter Expense Title:</label>
        <input
          id="title"
          name="title"
          required
          className="border p-2 w-full mb-2 rounded bg-white text-black focus-visible:border-purple-700"
          placeholder="Title"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-md text-white font-bold">Enter Amount:</label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="any"
          required
          className="border p-2 w-full mb-2 rounded bg-white text-black focus-visible:border-purple-700"
          placeholder="Amount"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="text-md text-white font-bold">Date:</label>
        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={today}
          max={today}
          className="border p-2 w-full mb-2 rounded bg-white text-black"
        />
      </div>

      <div className="flex justify-center w-full">
        <button
          type="submit"
          className="bg-purple-700 text-white font-bold w-[30%] py-2 rounded border-purple-300 transition duration-500 hover:bg-white hover:text-purple-300 hover:border-purple-700"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}