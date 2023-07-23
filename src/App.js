// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import HabitList from './components/HabitList'; // Check the correct file path
import HabitTracker from './components/HabitTracker'; // Check the correct file path

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HabitList />} />
          <Route path="/habit/:id" element={<HabitTracker />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
