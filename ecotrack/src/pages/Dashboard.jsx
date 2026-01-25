import { logs } from "../data/logs";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const totalCarbon = logs.reduce((total, log) => total + log.carbon, 0);

  const highCarbonActivities = logs.filter(log => log.carbon > 4);
  const lowCarbonActivities = logs.filter(log => log.carbon <= 4);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <h2 style={{ color: "green" }}>Dashboard</h2>

      <nav>
        <Link style={{ color: "blue", marginRight: "10px" }} to="/overview">
          Overview
        </Link>
        <Link style={{ color: "blue", marginRight: "10px" }} to="/reports">
          Reports
        </Link>
        <button
          onClick={handleLogout}
          style={{ color: "red", marginLeft: "10px" }}
        >
          Logout
        </button>
      </nav>

      <p style={{ color: "purple" }}>
        Total Carbon Footprint: {totalCarbon} Kg
      </p>

      <h3>All Activities</h3>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {log.activity}: {log.carbon} Kg
          </li>
        ))}
      </ul>

      <h3 style={{ color: "red" }}>High Carbon Activities (&gt; 4 Kg)</h3>
      <ul>
        {highCarbonActivities.map(log => (
          <li key={log.id}>
            {log.activity}: {log.carbon} Kg
          </li>
        ))}
      </ul>

      <h3 style={{ color: "green" }}>Low Carbon Activities (≤ 4 Kg)</h3>
      <ul>
        {lowCarbonActivities.map(log => (
          <li key={log.id}>
            {log.activity}: {log.carbon} Kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
