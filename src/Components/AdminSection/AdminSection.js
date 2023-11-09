import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './AdminSection.css'

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Section</h2>
      <div className="dashboard">
      <h4>Go to Admin Dashboard: <span> <Link to="/admin-dashboard"><Button >Click Here</Button> </Link></span></h4>
      
      </div>
      
    </div>
  );
};

export default AdminDashboard;
