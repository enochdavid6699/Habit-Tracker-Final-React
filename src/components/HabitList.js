// src/components/HabitList.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addHabit, deleteHabit } from '../actions/habits';

function HabitList({ habits, addHabit, deleteHabit }) {
  const [habitName, setHabitName] = useState('');

  const handleAddHabit = e => {
    e.preventDefault();
    if (habitName.trim() !== '') {
      addHabit({ name: habitName, days: getLastSevenDays() });
      setHabitName('');
    }
  };

  const handleDeleteHabit = id => {
    deleteHabit(id);
  };

  const getLastSevenDays = () => {
    const days = '0123456'.split('').map(day => {
      const date = new Date();
      date.setDate(date.getDate() - day);
      return { date: date.toISOString().split('T')[0], status: 'None' };
    });
    return days.reverse();
  };

  return (
    <div>
      <h1>Habit List</h1>
      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          value={habitName}
          onChange={e => setHabitName(e.target.value)}
          placeholder="New habit"
        />
        <button type="submit">Add Habit</button>
      </form>
      {habits.map((habit, index) => (
        <div key={index}>
          <Link to={`/habit/${index}`}>{habit.name}</Link>
          <button onClick={() => handleDeleteHabit(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  habits: state.habits,
});

const mapDispatchToProps = dispatch => ({
  addHabit: habit => dispatch(addHabit(habit)),
  deleteHabit: id => dispatch(deleteHabit(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitList);
