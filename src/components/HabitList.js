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
    <div className="habit-list-container">
      <h1 className="habit-list-title">Habit List</h1>
      <form onSubmit={handleAddHabit} className="habit-input-container">
        <input
          className="habit-input"
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="New habit..."
        />
        <button className="habit-button" type="submit">
          Add Habit
        </button>
      </form>
      {habits.map((habit, index) => (
        <div className="habit-item" key={index}>
          <Link to={`/habit/${index}`} className="habit-link">
            {habit.name}
          </Link>
          <button
            className="habit-delete-button"
            onClick={() => handleDeleteHabit(index)}
          >
            Delete
          </button>
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
