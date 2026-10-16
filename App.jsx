import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import Home from "./components/home_page";
import HabitTracker from "./components/Habit_tracker";
import StudentResources from "./components/Student_resources";
import StudentResult from "./components/Student_result";
import Login from "./components/Login";
import Register from "./components/Register";


/* =========================
   DASHBOARD LAYOUT
========================= */

function DashboardLayout() {
  const navigate = useNavigate();

  // Get logged-in user
  const savedUser = localStorage.getItem("studentUser");

  let user = null;

  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    user = null;
  }

  const userName = user?.name || "Student";
  const userEmail = user?.email || "student@example.com";

  // First letter of user's name
  const userInitial =
    userName.charAt(0).toUpperCase();


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("studentUser");
    navigate("/login");
  };


  return (
    <div className="app">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        {/* LOGO */}

        <div className="sidebar-logo">

          <div className="logo-icon">
            S
          </div>

          <div>
            <h2>StudentHub</h2>
            <span>Productivity Platform</span>
          </div>

        </div>


        {/* NAVIGATION */}

        <nav className="sidebar-nav">

          <span className="nav-section-title">
            MAIN MENU
          </span>


          {/* DASHBOARD */}

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">
              ⌂
            </span>

            <span>
              Dashboard
            </span>
          </NavLink>


          {/* HABIT TRACKER */}

          <NavLink
            to="/habit_tracker"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">
              ✓
            </span>

            <span>
              Habit Tracker
            </span>
          </NavLink>


          {/* STUDENT RESULTS */}

          <NavLink
            to="/student_result"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">
              ◈
            </span>

            <span>
              Student Results
            </span>
          </NavLink>


          {/* STUDY RESOURCES */}

          <NavLink
            to="/student_resources"
            className={({ isActive }) =>
              isActive
                ? "nav-link active"
                : "nav-link"
            }
          >
            <span className="nav-icon">
              📚
            </span>

            <span>
              Study Resources
            </span>
          </NavLink>

        </nav>


        {/* ================= SIDEBAR BOTTOM ================= */}

        <div className="sidebar-bottom">

          {/* HELP BOX */}

          <div className="sidebar-help">

            <div className="help-icon">
              ?
            </div>

            <div>
              <strong>
                Need Help?
              </strong>

              <span>
                Stay consistent.
              </span>
            </div>

          </div>


          {/* LOGGED-IN USER */}

          <div className="sidebar-user">

            <div className="user-avatar">
              {userInitial}
            </div>

            <div className="user-info">

              <strong>
                {userName}
              </strong>

              <span>
                {userEmail}
              </span>

            </div>

          </div>


          {/* LOGOUT */}

          <button
            className="logout-button"
            onClick={handleLogout}
          >

            <span>
              ↪
            </span>

            Logout

          </button>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="main-content">

        {/* HEADER */}

        <header className="top-header">

          {/* MOBILE LOGO */}

          <div className="mobile-logo">

            <div className="logo-icon">
              S
            </div>

            <strong>
              StudentHub
            </strong>

          </div>


          {/* HEADER RIGHT */}

          <div className="header-right">

            <div className="header-status">

              <span className="status-dot"></span>

              <span>
                System Online
              </span>

            </div>


            {/* USER NAME */}

            <div className="header-user">

              <div className="header-user-text">

                <strong>
                  {userName}
                </strong>



              </div>


              <div className="header-avatar">
                {userInitial}
              </div>

            </div>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <div className="page-content">

          <Outlet />

        </div>

      </main>

    </div>
  );
}


/* =========================
   APP ROUTES
========================= */

function App() {

  return (

    <Routes>

      {/* ================= LOGIN ================= */}

      <Route
        path="/login"
        element={
          <div className="auth-only-page">
            <Login />
          </div>
        }
      />


      {/* ================= REGISTER ================= */}

      <Route
        path="/register"
        element={
          <div className="auth-only-page">
            <Register />
          </div>
        }
      />


      {/* ================= DASHBOARD ROUTES ================= */}

      <Route
        element={<DashboardLayout />}
      >

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* HABIT TRACKER */}

        <Route
          path="/habit_tracker"
          element={<HabitTracker />}
        />


        {/* STUDENT RESOURCES */}

        <Route
          path="/student_resources"
          element={<StudentResources />}
        />


        {/* STUDENT RESULTS */}

        <Route
          path="/student_result"
          element={<StudentResult />}
        />

      </Route>

    </Routes>

  );
}


/* =========================
   ROOT APP
========================= */

function RootApp() {

  return (

    <BrowserRouter>

      <App />

    </BrowserRouter>

  );

}


export default RootApp;