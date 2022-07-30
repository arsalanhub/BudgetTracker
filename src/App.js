import ExpenseItem from "./components/ExpenseItem";

function App() {
  const expenses = [
    { id: "e1", title: "Book", amount: 60, date: new Date(2022, 2, 24) },
    { id: "e2", title: "Pencil", amount: 10, date: new Date(2022, 7, 12) },
    { id: "e3", title: "Pizza", amount: 200, date: new Date(2022, 1, 1) },
    { id: "e4", title: "Juice", amount: 30, date: new Date(2022, 4, 14) },
  ];
  return (
    <div>
      <ExpenseItem
        title={expenses[0].title}
        amount={expenses[0].amount}
        date={expenses[0].date}
      />
      <ExpenseItem
        title={expenses[1].title}
        amount={expenses[1].amount}
        date={expenses[1].date}
      />
      <ExpenseItem
        title={expenses[2].title}
        amount={expenses[2].amount}
        date={expenses[2].date}
      />
      <ExpenseItem
        title={expenses[3].title}
        amount={expenses[3].amount}
        date={expenses[3].date}
      />
    </div>
  );
}

export default App;
