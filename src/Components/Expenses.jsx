import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import '../App.css';

export default function Expenses() {
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    // Load expenses data from local storage when the component mounts
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedExpenses) {
      setExpenses(storedExpenses);
      calcTotalCost(storedExpenses);
    }
  }, []);

  const handleCreateExpense = () => {
    if (!title || !cost) {
      setErrorMessage('Please enter both title and cost.');
      return;
    }

    const newExpense = { id: Date.now(), title, cost: parseFloat(cost) };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    calcTotalCost(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    // Clear form fields
    setTitle('');
    setCost('');
    setErrorMessage('');
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(updatedExpenses);
    calcTotalCost(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const calcTotalCost = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + expense.cost, 0);
    setTotalCost(total);
  };

  return (
    <div className='container'>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="inputs">
          <TextField id="filled-basic" label="Title" variant="filled" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField id="filled-basic" label="Cost EGP" type='number' variant="filled" value={cost} onChange={(e) => setCost(e.target.value)} />
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={handleCreateExpense}>Create</Button>
          </Stack>
          {errorMessage && <div className='alert'>{errorMessage}</div>}
        </div>
      </Box>

      <div className="expenses-list">
        <ul>
          {expenses.map(expense => (
            <li key={expense.id}>
              <div>{expense.title}</div>
              <div>{expense.cost} EGP</div>
              <i className="fas fa-trash del" onClick={() => handleDeleteExpense(expense.id)}></i>
            </li>
          ))}
        </ul>
        {expenses.length > 0 && <h2 className='total'>You Spend: {totalCost} EGP</h2>}
      </div>
    </div>
  );
}
