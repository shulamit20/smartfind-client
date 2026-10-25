import {  Link, useParams } from "react-router-dom"
import LostReportForm from "../../components/LostReportForm"
import { useReport } from "../../hooks/useLostReports";

const ReportFormPage=()=>
{
   const {id}=useParams();
   const isExist=	Boolean(id);
   const{data: report, isLoading ,error}=useReport(Number(id))
  if (isExist && isLoading) return <p className="loader">בטעינה</p>;
if (isExist && (error || !report)) {
  return (
    <div className="page-narrow">
      <div className="empty">
      <p className="mb-4">הדיווח לא נמצא.</p>
      <Link to="/my-reports" className="link-back">חזרה לדיווחים שלי</Link>
      </div>
    </div>
  );
}
   return<div className="page-narrow">
       <h1 className="page-title animate-rise">{isExist ? "עריכת דיווח" : "דיווח על אבדה"}</h1>
      <p className="page-lead animate-rise">מלאי את הפרטים, ונציג לך פריטים שנמצאו ודומים למה שאיבדת.</p>

      <div className="card form-card">
         {isExist&&<LostReportForm existingReport={report} />}
         {!isExist&&<LostReportForm />}
      </div>
      <Link to="/my-reports" className="link-back mt-7">חזרה לדיווחים שלי</Link>
    </div>
}
export default ReportFormPage