import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ExpanseItem from "../../Components/ExpanseItem";

async function getExpenses(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/expense`, {
    headers: { Authorization: token },
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

const expDate = e => new Date(e.date || e.createdAt);

export default async function Dashboard() {
  const token = (await cookies()).get("session_token")?.value;
  if (!token) redirect("/");

  const expenses = await getExpenses(token);

  // Group by "YYYY-MM". Only months with at least one expense get a key.
  const grouped = expenses.reduce((acc, e) => {
    const d = expDate(e);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    (acc[key] ||= []).push(e);
    return acc;
  }, {});

  const months = Object.keys(grouped).sort().reverse(); // newest first

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">All Expenses</h1>

      {months.length === 0 && <p className="text-gray-500">No expenses yet.</p>}

      {months.map(key => {
        const [year, month] = key.split("-");
        const label = new Date(year, month - 1).toLocaleString("en-IN", {
          month: "long",
          year: "numeric",
        });
        const items = grouped[key].sort((a, b) => expDate(b) - expDate(a));
        const total = items.reduce((s, e) => s + Number(e.amount), 0);

        return (
          <details key={key} className="mb-3 bg-purple-100 rounded shadow">
            <summary className="cursor-pointer p-3 font-bold text-black flex justify-between">
              <span>{label}</span>
              <span>{items.length} expense{items.length > 1 ? "s" : ""}</span>
            </summary>

            <div className="p-3">
              {items.map(e => (
                <ExpanseItem key={e._id} expense={e} />
              ))}

              <div className="flex justify-between font-bold text-black border-t border-purple-300 mt-3 pt-3">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>
          </details>
        );
      })}
    </div>
  );
}