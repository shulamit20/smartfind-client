import { useContext } from "react";
import { Link } from "react-router-dom";
import RequestCard from "../../components/RequestCard"
import { useRequests } from "../../hooks/useOwnershipRequests";
import { AuthContext } from "../../context/userContext";


const AdminRequestsPage=()=>
{
 const { data, isLoading, error } = useRequests("Pending");
 const { user } = useContext(AuthContext);

  if (isLoading) return <p className="loader">בטעינה</p>;
  if (error) return (
    <div className="page">
      <p className="alert-error">שגיאה בטעינת הבקשות</p>
    </div>
  );

  if (!data || data.items.length === 0) {
    return (
      <div className="page">
        <div className="home-hero home-hero-admin">
          <div>
          <p className="home-chip">דף הבית</p>
          <p className="home-greeting">שלום, {user?.fullName}</p>
          <h1 className="home-title">בקשות בעלות</h1>
          <p className="home-text mb-0">אין בקשות שממתינות לבדיקה.</p>
          </div>
          <div className="home-tiles">
            <Link to="/admin/found-items" className="home-tile home-tile-items">ניהול פריטים</Link>
            <Link to="/admin/found-items/new" className="home-tile home-tile-new">פריט חדש</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="home-hero home-hero-admin">
        <div>
        <p className="home-chip">דף הבית</p>
        <p className="home-greeting">שלום, {user?.fullName}</p>
        <h1 className="home-title">בקשות בעלות</h1>
        <p className="pending-count">{data.total} בקשות ממתינות</p>
        </div>
        <div className="home-tiles">
          <Link to="/admin/found-items" className="home-tile home-tile-items">ניהול פריטים</Link>
          <Link to="/admin/found-items/new" className="home-tile home-tile-new">פריט חדש</Link>
        </div>
      </div>

      <h2 className="section-title animate-rise [animation-delay:100ms]">ממתינות לבדיקה</h2>

      <div className="enter grid gap-6">
        {data.items.map((request) => (
          <RequestCard key={request.id} request={request} />
        ))}
      </div>
    </div>
  );
}
export default AdminRequestsPage
