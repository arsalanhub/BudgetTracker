import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const App = () => {
  const expenses = [
    { id: "e1", title: "Book", amount: 60, date: new Date(2022, 2, 24) },
    { id: "e2", title: "Pencil", amount: 10, date: new Date(2022, 7, 12) },
    { id: "e3", title: "Pizza", amount: 200, date: new Date(2022, 1, 1) },
    { id: "e4", title: "Juice", amount: 30, date: new Date(2022, 4, 14) },
  ];
  return (
    <div>
      <NewExpense />
      <Expenses item={expenses} />
    </div>
  );
};

export default App;
