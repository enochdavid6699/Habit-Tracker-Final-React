export function addHabit(habit) {
    return {
      type: 'ADD_HABIT',
      payload: habit,
    };
  }
  
  export function updateHabitDay(id, days) {
    return {
      type: 'UPDATE_HABIT',
      payload: { id, days },
    };
  }

  export function deleteHabit(id) {
    return {
      type: 'DELETE_HABIT',
      payload: id,
    };
  }
  