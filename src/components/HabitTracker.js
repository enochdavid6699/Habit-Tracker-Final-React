import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateHabitDay } from '../actions/habits';
import { Link } from 'react-router-dom';

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
    <div className="habit-tracker-container">
      <Link to={`/`} className="btn btn-primary">
            Back
      </Link>
      <h1 className="habit-name">{habit.name}</h1>
      {habit.days.map((day, index) => (
        <div className="habit-day" key={index}>
          <p className="habit-date">{day.date}</p>
          <div className="habit-status-buttons">
            <button
              className="habit-status-button habit-status-button-done"
              onClick={() => handleStatusChange(index, 'Done')}
            >
              Mark as Done
            </button>
            <button
              className="habit-status-button habit-status-button-not-done"
              onClick={() => handleStatusChange(index, 'Not Done')}
            >
              Mark as Not Done
            </button>
            <button
              className="habit-status-button habit-status-button-clear"
              onClick={() => handleStatusChange(index, 'None')}
            >
              Clear Status
            </button>
          </div>
          <p className="habit-status">Status: {day.status}</p>
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
