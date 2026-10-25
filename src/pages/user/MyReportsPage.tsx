import { useContext } from "react";
import { Link } from "react-router-dom";
import ReportCard from "../../components/ReportCard";
import { useMyReports } from "../../hooks/useLostReports";
import { AuthContext } from "../../context/authContext";

const MyReportsPage=()=>
{
  const { data, isLoading, error } = useMyReports();
  const { user } = useContext(AuthContext);


  if (isLoading) return <p className="loader">בטעינה</p>;
  if (error) return (
    <div className="page">
      <p className="alert-error">שגיאה בטעינת הדיווחים</p>
    </div>
  );


  if (!data || data.items.length === 0) {
    return (
      <div className="page">
        <div className="home-hero">
          <p className="home-chip">דף הבית</p>
          <p className="home-greeting">שלום, {user?.fullName}</p>
          <h1 className="home-title">הדיווחים שלי</h1>
          <p className="home-text">עוד לא דיווחת על אבדה.</p>
          <Link to="/my-reports/new" className="btn btn-light">לדיווח הראשון</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="home-hero">
        <p className="home-chip">דף הבית</p>
        <p className="home-greeting">שלום, {user?.fullName}</p>
        <h1 className="home-title">הדיווחים שלי</h1>
        <p className="home-text">כאן רואים כל דיווח ששלחת, ואת ההתאמות שנמצאו עבורו.</p>
        <Link to="/my-reports/new" className="btn btn-light">+ דיווח חדש</Link>
      </div>

      <h2 className="section-title animate-rise [animation-delay:100ms]">הדיווחים האחרונים</h2>

      <div className="enter grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {
            data.items.map((report)=>(
             <div key={report.id} className="card card-hover group flex flex-col p-0 sm:p-0">
               <ReportCard  report={report} />
                 {report.status === "Open" && (
                  <div className="absolute bottom-0 left-0 px-5 py-2.5">
                    <Link to={`/my-reports/${report.id}/edit`} className="link-edit">עריכה</Link>
                  </div>
                 )}
                 </div>

            ))
        }
      </div>
    </div>
  );
}

export default MyReportsPage
