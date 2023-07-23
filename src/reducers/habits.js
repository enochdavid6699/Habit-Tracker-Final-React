const initialState = [];

function getLastSevenDays() {
    const days = '0123456'.split('').map(day => {
        const date = new Date();
        date.setDate(date.getDate() - day);
        return { date: date.toISOString().split('T')[0], status: 'None' };
    });
    return days.reverse();
}

function habitsReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_HABIT':
            return [...state, { ...action.payload, days: getLastSevenDays() }];
        case 'UPDATE_HABIT':
            return state.map((habit, index) =>
                index === action.payload.id ? { ...habit, days: action.payload.days } : habit
            );
        case 'DELETE_HABIT':
            return state.filter((_, index) => index !== action.payload);
        default:
            return state;
    }
}

export default habitsReducer;
