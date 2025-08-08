import "./budget.css";
import { useState } from "react";
const Budget = () => {
  const [budgets, setBudjets] = useState([
    { name: "Salary", type: "income", date: "01-08-2025", amount: 25000 },
    { name: "Grocery", type: "expense", date: "02-08-2025", amount: 2000 },
    { name: "Internet Bill", type: "expense", date: "05-08-2025", amount: 700 },
  ]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [i, setI] = useState(0);
  let income = 0;
  let expense = 0;
  let balance = 0;
  function add() {
    let newBudget = { name: name, type: type, date: date, amount: amount };
    if (date == "" && name == "" && type == "" && amount == "") {
      alert("all feilds ere empty!! please fill all feilds!!");
    } else if (name == "") {
      alert("name feild is empty!");
    } else if (date == "") {
      alert("date feild is empty!");
    } else if (type == "") {
      alert("type feild is empty!");
    } else if (amount == "") {
      alert("amount feild is empty!");
    } else {
      setBudjets([...budgets, newBudget]);
    }
  }
  function update(i) {
    let temp = [...budgets];
    temp[i].name = name;
    temp[i].type = type;
    temp[i].amount = amount;
    temp[i].date = date;
    setBudjets(temp);
  }
  function deleteAm(index) {
    let temp = [...budgets];
    temp.splice(index, 1);
    setBudjets(temp);
  }
  function edit(index) {
    setI(index);
    let temp = [...budgets];
    setName(temp[index].name);
    setAmount(temp[index].amount);
    setDate(temp[index].date);
    setType(temp[index].type);
    setBudjets(temp);
  }
  function Income(budget) {
    if(budget.type=="income")
    {
        income+=budget.amount;
    }
  }
  function Expense(budget)
  {
    if(budget.type=="expense")
    {
        expense+=budget.amount;
    }
  }
  function Balance(budget)
  {
    if(budget.type=="income")
    {
        balance+=budget.amount;
    }
    else
    {
        balance-=budget.amount;
    }
  }
  return (
    <>
      <h1>💸Income/Expense Budget📝</h1>
      <input
        type="text"
        placeholder="Enter the name..."
        value={name}
        id="name"
        className="input"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter the date..."
        className="input"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        placeholder="Enter the amount..."
        className="input"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter the type..."
        className="input"
        id="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <button id="add-btn" onClick={() => add()}>Add</button>
      <button id="update-btn" onClick={() => update(i)}>Update</button>
      {budgets.map((budget, index) => (
        <div key={index} id="main-container">
          <div id="name-budget">
            <h3 className="name">{budget.name}</h3>
            <p className="date">{budget.date}</p>
          </div>
          <h4 className="type">{budget.type}</h4>
          <h3 className="amount">{budget.amount}$</h3>
          <button id="delete-btn" onClick={() => deleteAm(index)}>Delete</button>
          <button id="edit-btn" onClick={() => edit(index)}>Edit</button>
          {Income(budget)}
          {Expense(budget)}
          {Balance(budget)}
        </div>
      ))}
      {}
      <h2 className="income">Total Income : {income}$</h2>
      <h2 className="expense">Total Expense : {expense}$</h2>
      <h2 className="balance">Total balance : {balance}$</h2>
    </>
  );
};
export default Budget;
