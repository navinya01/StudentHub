import React, { useEffect, useState } from "react";
import "../App.css";
import Toast from "./Toast";

function Home() {
  const [students, setStudents] = useState([]);
  const [results, setResults] = useState([]);
  const [habits, setHabits] = useState([]);

  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Load dashboard data
  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        studentsRes,
        resultsRes,
        habitsRes,
      ] = await Promise.all([
        fetch("http://localhost:5000/students"),
        fetch("http://localhost:5000/results"),
        fetch("http://localhost:5000/habits"),
      ]);

      const studentsData = await studentsRes.json();
      const resultsData = await resultsRes.json();
      const habitsData = await habitsRes.json();

      if (studentsData.success) {
        setStudents(studentsData.students);
      }

      if (resultsData.success) {
        setResults(resultsData.results);
      }

      if (habitsData.success) {
        setHabits(habitsData.habits);
      }
    } catch (error) {
      console.error("Dashboard loading error:", error);

      setToast({
        message: "Could not load dashboard data",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Habit calculations
  const completedHabits = habits.filter(
    (habit) => habit.completed
  ).length;

  const habitProgress =
    habits.length > 0
      ? Math.round(
          (completedHabits / habits.length) * 100
        )
      : 0;

  // Result calculations
  const totalMarks = results.reduce(
    (sum, result) =>
      sum + Number(result.marks),
    0
  );

  const possibleMarks = results.reduce(
    (sum, result) =>
      sum + Number(result.total_marks),
    0
  );

  const averageScore =
    possibleMarks > 0
      ? Math.round(
          (totalMarks / possibleMarks) * 100
        )
      : 0;

  const studyProgress = Math.min(
    100,
    Math.max(0, averageScore)
  );

  // Overall productivity
  const productivity = Math.round(
    (habitProgress + averageScore) / 2
  );

  // Recent activity
  const recentResults = results.slice(0, 3);
  const recentHabits = habits.slice(0, 3);

  return (
    <div className="dashboard dashboard-animated">

      {/* =========================
          LOADING SCREEN
      ========================== */}

      {loading ? (

        <div className="dashboard-loading">

          <div className="dashboard-loader"></div>

          <h2>Loading StudentHub...</h2>

          <p>
            Preparing your productivity dashboard
          </p>

        </div>

      ) : (

        <>

          {/* =========================
              WELCOME SECTION
          ========================== */}

          <section className="welcome-card">

            <div className="welcome-content">

              <span className="welcome-label">
                STUDENT DASHBOARD
              </span>

              <h1>
                Welcome back, Student! 👋
              </h1>

              <p>
                Stay organized, track your habits
                and monitor your academic progress
                from one powerful dashboard.
              </p>

              <button
                className="primary-btn"
                onClick={() =>
                  document
                    .getElementById(
                      "dashboard-overview"
                    )
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                View Overview →
              </button>

            </div>


            <div className="welcome-illustration">

              <div className="floating-icon icon-one">
                📚
              </div>

              <div className="floating-icon icon-two">
                🎯
              </div>

              <div className="floating-icon icon-three">
                ✓
              </div>

              <div className="hero-circle">
                🎓
              </div>

            </div>

          </section>


          {/* =========================
              STATS
          ========================== */}

          <section
            className="stats-grid"
            id="dashboard-overview"
          >

            <div className="stat-card">

              <div className="stat-icon blue">
                👨‍🎓
              </div>

              <div className="stat-info">

                <span>Total Students</span>

                <h2>
                  {String(
                    students.length
                  ).padStart(2, "0")}
                </h2>

                <small className="positive">
                  ● Database records
                </small>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon green">
                ✓
              </div>

              <div className="stat-info">

                <span>Completed Habits</span>

                <h2>
                  {String(
                    completedHabits
                  ).padStart(2, "0")}
                </h2>

                <small className="positive">
                  {habitProgress}% completion
                </small>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon purple">
                ◈
              </div>

              <div className="stat-info">

                <span>Results Added</span>

                <h2>
                  {String(
                    results.length
                  ).padStart(2, "0")}
                </h2>

                <small className="positive">
                  Academic records
                </small>

              </div>

            </div>


            <div className="stat-card">

              <div className="stat-icon orange">
                ★
              </div>

              <div className="stat-info">

                <span>Average Score</span>

                <h2>
                  {averageScore}%
                </h2>

                <small className="positive">

                  {averageScore >= 75
                    ? "Excellent progress"
                    : averageScore >= 50
                    ? "Good progress"
                    : "Keep improving"}

                </small>

              </div>

            </div>

          </section>


          {/* =========================
              PRODUCTIVITY + QUICK ACTIONS
          ========================== */}

          <section className="dashboard-grid">

            {/* PRODUCTIVITY */}

            <div className="dashboard-panel productivity-panel">

              <div className="panel-header">

                <div>

                  <span className="panel-label">
                    PRODUCTIVITY
                  </span>

                  <h2>
                    Overall Progress
                  </h2>

                </div>

                <button
                  className="more-btn"
                  onClick={loadDashboard}
                  title="Refresh dashboard"
                >
                  ↻
                </button>

              </div>


              <div className="progress-area">

                <div
                  className="progress-circle"
                  style={{
                    background: `conic-gradient(
                      #4f46e5 0deg
                      ${productivity * 3.6}deg,
                      #eef2ff
                      ${productivity * 3.6}deg
                      360deg
                    )`,
                  }}
                >

                  <div className="progress-inner">

                    <strong>
                      {productivity}%
                    </strong>

                    <span>
                      Complete
                    </span>

                  </div>

                </div>


                <div className="progress-details">

                  <div className="progress-item">

                    <span>
                      <i className="dot blue-dot"></i>
                      Study
                    </span>

                    <strong>
                      {studyProgress}%
                    </strong>

                  </div>


                  <div className="progress-item">

                    <span>
                      <i className="dot green-dot"></i>
                      Habits
                    </span>

                    <strong>
                      {habitProgress}%
                    </strong>

                  </div>


                  <div className="progress-item">

                    <span>
                      <i className="dot purple-dot"></i>
                      Results
                    </span>

                    <strong>
                      {averageScore}%
                    </strong>

                  </div>

                </div>

              </div>

            </div>


            {/* QUICK ACTIONS */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <div>

                  <span className="panel-label">
                    QUICK ACCESS
                  </span>

                  <h2>
                    Quick Actions
                  </h2>

                </div>

              </div>


              <div className="quick-actions">

                <div
                  className="quick-action"
                  onClick={() =>
                    (window.location.href =
                      "/habit_tracker")
                  }
                >

                  <div className="quick-icon blue">
                    ✓
                  </div>

                  <div>

                    <strong>
                      Track Habit
                    </strong>

                    <span>
                      Manage daily habits
                    </span>

                  </div>

                  <b>→</b>

                </div>


                <div
                  className="quick-action"
                  onClick={() =>
                    (window.location.href =
                      "/student_result")
                  }
                >

                  <div className="quick-icon purple">
                    📊
                  </div>

                  <div>

                    <strong>
                      View Results
                    </strong>

                    <span>
                      Check academic performance
                    </span>

                  </div>

                  <b>→</b>

                </div>


                <div
                  className="quick-action"
                  onClick={() =>
                    (window.location.href =
                      "/student_resources")
                  }
                >

                  <div className="quick-icon orange">
                    📚
                  </div>

                  <div>

                    <strong>
                      Study Resources
                    </strong>

                    <span>
                      Explore learning materials
                    </span>

                  </div>

                  <b>→</b>

                </div>

              </div>

            </div>

          </section>


          {/* =========================
              RECENT ACTIVITY + SCORE
          ========================== */}

          <section className="bottom-grid">

            {/* RECENT ACTIVITY */}

            <div className="dashboard-panel">

              <div className="panel-header">

                <div>

                  <span className="panel-label">
                    ACTIVITY
                  </span>

                  <h2>
                    Recent Activity
                  </h2>

                </div>

              </div>


              <div className="activity-list">

                {recentHabits.map(
                  (habit) => (

                    <div
                      className="activity-item"
                      key={`habit-${habit.id}`}
                    >

                      <div className="activity-icon green">
                        ✓
                      </div>

                      <div>

                        <strong>
                          Habit activity
                        </strong>

                        <span>
                          {habit.habit_name}
                        </span>

                      </div>

                      <small>
                        {habit.completed
                          ? "Completed"
                          : "Pending"}
                      </small>

                    </div>

                  )
                )}


                {recentResults.map(
                  (result) => (

                    <div
                      className="activity-item"
                      key={`result-${result.id}`}
                    >

                      <div className="activity-icon purple">
                        📊
                      </div>

                      <div>

                        <strong>
                          Result added
                        </strong>

                        <span>
                          {result.subject} —{" "}
                          {result.marks}/
                          {result.total_marks}
                        </span>

                      </div>

                      <small>
                        Academic
                      </small>

                    </div>

                  )
                )}


                {recentHabits.length === 0 &&
                  recentResults.length === 0 && (

                    <div className="dashboard-empty">

                      <span>
                        📋
                      </span>

                      <p>
                        No recent activity yet.
                      </p>

                    </div>

                  )}

              </div>

            </div>


            {/* ACADEMIC SCORE */}

            <div className="dashboard-panel performance-panel">

              <div className="panel-header">

                <div>

                  <span className="panel-label">
                    PERFORMANCE
                  </span>

                  <h2>
                    Academic Score
                  </h2>

                </div>

              </div>


              <div className="score-display">

                <div className="score-number">

                  {averageScore}
                  <span>%</span>

                </div>

                <p>
                  Current average score
                </p>


                <div className="score-bar">

                  <div
                    className="score-fill"
                    style={{
                      width: `${averageScore}%`,
                    }}
                  ></div>

                </div>


                <div className="score-footer">

                  <span>0%</span>

                  <strong>
                    {averageScore}%
                  </strong>

                  <span>100%</span>

                </div>

              </div>

            </div>

          </section>


          {/* TOAST */}

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() =>
                setToast(null)
              }
            />
          )}

        </>

      )}

    </div>
  );
}

export default Home;