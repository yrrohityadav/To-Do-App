import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { store } from './store';
import Layout from './components/Layout';
import Login from './pages/Login';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <div className="max-w-4xl mx-auto">
                  <TaskInput />
                  <TaskList />
                </div>
              }
            />
            <Route
              path="/today"
              element={
                <div className="max-w-4xl mx-auto">
                  <TaskInput />
                  <TaskList />
                </div>
              }
            />
            <Route
              path="/important"
              element={
                <div className="max-w-4xl mx-auto">
                  <TaskInput />
                  <TaskList />
                </div>
              }
            />
            <Route
              path="/assigned"
              element={
                <div className="max-w-4xl mx-auto">
                  <TaskInput />
                  <TaskList />
                </div>
              }
            />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;