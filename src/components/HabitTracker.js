// src/components/HabitTracker.js
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateHabitDay } from '../actions/habits';

function HabitTracker({ habits, updateHabitDay }) {
  const { id } = useParams();
  const habit = habits[id];
  const navigate = useNavigate();

  if (!habit) {
    navigate('/');
    return null;
  }

  const handleStatusChange = (dayIndex, status) => {
    const days = [...habit.days];
    days[dayIndex].status = status;
    updateHabitDay(id, days);
  };

  return (
    <div>
      <h1>{habit.name}</h1>
      {habit.days.map((day, index) => (
        <div key={index}>
          <p>{day.date}</p>
          <button onClick={() => handleStatusChange(index, 'Done')}>Mark as Done</button>
          <button onClick={() => handleStatusChange(index, 'Not Done')}>Mark as Not Done</button>
          <button onClick={() => handleStatusChange(index, 'None')}>Clear Status</button>
          <p>Status: {day.status}</p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  habits: state.habits,
});

const mapDispatchToProps = dispatch => ({
  updateHabitDay: (id, days) => dispatch(updateHabitDay(id, days)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HabitTracker);
