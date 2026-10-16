import React, { useEffect, useState } from "react";
import "../App.css";
import Toast from "./Toast";

function HabitTracker() {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState([]);

  // Toast state
  const [toast, setToast] = useState(null);

  // Load habits
  const loadHabits = () => {
    fetch("http://localhost:5000/habits")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setHabits(data.habits);
        }
      })
      .catch((error) => {
        console.error("Habit loading error:", error);

        setToast({
          message: "Could not load habits",
          type: "error",
        });
      });
  };

  // Load students + habits
  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStudents(data.students);
        }
      })
      .catch((error) => {
        console.error("Student loading error:", error);

        setToast({
          message: "Could not load students",
          type: "error",
        });
      });

    loadHabits();
  }, []);

  // Add new habit
  const addHabit = async (e) => {
    e.preventDefault();

    if (!studentId || !habitName.trim()) {
      setToast({
        message: "Please select a student and enter a habit",
        type: "error",
      });

      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/habits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: studentId,
            habit_name: habitName.trim(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setHabitName("");
        loadHabits();

        setToast({
          message: "Habit added successfully!",
          type: "success",
        });
      } else {
        setToast({
          message: "Habit could not be added",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Add habit error:", error);

      setToast({
        message: "Server error. Please try again.",
        type: "error",
      });
    }
  };

  // Toggle habit status
  const toggleHabit = async (habit) => {
    try {
      const response = await fetch(
        `http://localhost:5000/habits/${habit.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !habit.completed,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        loadHabits();

        setToast({
          message: habit.completed
            ? "Habit marked as pending"
            : "Habit completed successfully!",
          type: "success",
        });
      } else {
        setToast({
          message: "Habit status could not be updated",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Habit update error:", error);

      setToast({
        message: "Server error. Please try again.",
        type: "error",
      });
    }
  };

  // Statistics
  const completedCount = habits.filter(
    (habit) => habit.completed
  ).length;

  const pendingCount =
    habits.length - completedCount;

  const progress =
    habits.length > 0
      ? Math.round(
          (completedCount / habits.length) * 100
        )
      : 0;

  return (
    <div className="page-container">

      {/* PAGE HEADER */}
      <div className="inner-page-header">

        <div>
          <span className="page-eyebrow">
            PRODUCTIVITY
          </span>

          <h1>Habit Tracker</h1>

          <p>
            Build consistent habits and stay productive every day.
          </p>
        </div>

        <div className="large-page-icon">
          ✓
        </div>

      </div>


      {/* STATS */}
      <div className="habit-stats">

        <div className="habit-stat">

          <div className="habit-stat-icon blue">
            📋
          </div>

          <div>
            <span>Total Habits</span>
            <strong>{habits.length}</strong>
          </div>

        </div>


        <div className="habit-stat">

          <div className="habit-stat-icon green">
            ✓
          </div>

          <div>
            <span>Completed</span>
            <strong>{completedCount}</strong>
          </div>

        </div>


        <div className="habit-stat">

          <div className="habit-stat-icon orange">
            ⏳
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingCount}</strong>
          </div>

        </div>


        <div className="habit-stat">

          <div className="habit-stat-icon purple">
            ★
          </div>

          <div>
            <span>Progress</span>
            <strong>{progress}%</strong>
          </div>

        </div>

      </div>


      {/* MAIN GRID */}
      <div className="habit-layout">

        {/* ADD HABIT */}
        <div className="modern-panel">

          <div className="panel-heading">

            <div>
              <span className="panel-label">
                NEW HABIT
              </span>

              <h2>Add a Habit</h2>
            </div>

            <div className="small-panel-icon">
              +
            </div>

          </div>


          <form onSubmit={addHabit}>

            <label>Select Student</label>

            <select
              value={studentId}
              onChange={(e) =>
                setStudentId(e.target.value)
              }
            >

              <option value="">
                -- Select Student --
              </option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name} - {student.roll_no}
                </option>
              ))}

            </select>


            <label>Habit Name</label>

            <input
              type="text"
              value={habitName}
              onChange={(e) =>
                setHabitName(e.target.value)
              }
              placeholder="e.g. Study 2 Hours"
            />


            <button
              className="modern-submit"
              type="submit"
            >
              + Add Habit
            </button>

          </form>

        </div>


        {/* PROGRESS */}
        <div className="modern-panel progress-panel">

          <div className="panel-heading">

            <div>
              <span className="panel-label">
                YOUR PROGRESS
              </span>

              <h2>Daily Completion</h2>
            </div>

            <span className="progress-percentage">
              {progress}%
            </span>

          </div>


          <div className="large-progress">

            <div
              className="large-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>


          <div className="progress-caption">

            <span>0%</span>

            <span>
              {completedCount} of {habits.length} completed
            </span>

            <span>100%</span>

          </div>


          <div className="motivation-box">

            <span>🎯</span>

            <div>

              <strong>
                {progress >= 80
                  ? "Excellent work!"
                  : progress >= 50
                  ? "Keep going!"
                  : "Start building your routine!"}
              </strong>

              <p>
                Small daily improvements create big results.
              </p>

            </div>

          </div>

        </div>

      </div>


      {/* HABIT LIST */}
      <div className="modern-panel habits-list-panel">

        <div className="panel-heading">

          <div>

            <span className="panel-label">
              DAILY ROUTINE
            </span>

            <h2>My Habits</h2>

          </div>

          <span className="habit-count">
            {habits.length} habits
          </span>

        </div>


        {habits.length === 0 ? (

          <div className="empty-state">

            <div>✓</div>

            <h3>No habits added yet</h3>

            <p>
              Add your first habit to start tracking your productivity.
            </p>

          </div>

        ) : (

          <div className="habit-list">

            {habits.map((habit) => (

              <div
                className={
                  habit.completed
                    ? "habit-item completed-habit"
                    : "habit-item"
                }
                key={habit.id}
              >

                <div className="habit-check">
                  {habit.completed ? "✓" : "○"}
                </div>


                <div className="habit-information">

                  <strong>
                    {habit.habit_name}
                  </strong>

                  <span>
                    {habit.name} • {habit.roll_no}
                  </span>

                </div>


                <div
                  className={
                    habit.completed
                      ? "habit-status done"
                      : "habit-status pending-status"
                  }
                >

                  {habit.completed
                    ? "Completed"
                    : "Pending"}

                </div>


                <button
                  className={
                    habit.completed
                      ? "habit-action undo"
                      : "habit-action"
                  }
                  onClick={() =>
                    toggleHabit(habit)
                  }
                >

                  {habit.completed
                    ? "Mark Pending"
                    : "Complete"}

                </button>

              </div>

            ))}

          </div>

        )}

      </div>


      {/* TOAST NOTIFICATION */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}

export default HabitTracker;