import { Link, useParams } from "react-router-dom";
import MatchCard from "../../components/MatchCard";
import RequestStatusCard from "../../components/RequestStatusCard";
import { useReport, useMatches } from "../../hooks/useLostReports";
import { useRequests } from "../../hooks/useOwnershipRequests";

const ReportDetailsPage = () => {
  const { id } = useParams();
  const { data: report, isLoading, error } = useReport(Number(id));
  const { data: matches, isLoading: matchesLoading } = useMatches(Number(id));
  const { data: requests } = useRequests();

  if (isLoading) return <p className="loader">בטעינה</p>;

  if (error || !report) {
    return (
      <div className="page-narrow">
        <div className="empty">
        <p className="mb-4">הדיווח לא נמצא.</p>
        <Link to="/my-reports" className="link-back">חזרה לדיווחים שלי</Link>
        </div>
      </div>
    );
  }

  const reportRequests =
    requests?.items.filter((request) => request.lostReport.id === report.id) ?? [];

  const renderMatches = () => {
    if (matchesLoading) return <p className="loader">בחיפוש התאמות...</p>;

    if (!matches || matches.length === 0) {
      return <p className="empty">עדיין לא נמצאו התאמות. נבדוק שוב כשיירשמו פריטים חדשים.</p>;
    }

    return (
      <div className="enter grid gap-4">
        <h2 className="section-title mb-0">התאמות אפשריות</h2>
        {matches.map((match) => (
          <MatchCard key={match.foundItem.id} match={match} reportId={report.id} />
        ))}
      </div>
    );
  };

  return (
    <div className="page grid content-start gap-10">
      <section className="report-head">
      <h1 className="page-title">{report.title}</h1>
      <p className="report-desc">{report.description}</p>
      <div className="card facts">
      <p className="fact"><span className="fact-label">קטגוריה</span>{report.category.name}</p>
      <p className="fact"><span className="fact-label">צבע</span>{report.color.name}</p>
      <p className="fact"><span className="fact-label">מיקום</span>{report.location.name}</p>
      <p className="fact"><span className="fact-label">תאריך אבדה</span>{new Date(report.lostDate).toLocaleDateString("he-IL")}</p>
      </div>
      <p className="badge order-first self-start" data-status={report.status}>סטטוס: {report.status === "Open" ? "פתוח" : "הוחזר"}</p>
      </section>

      {reportRequests.length > 0 && (
        <div className="grid gap-4 animate-rise [animation-delay:100ms]">
          <h2 className="section-title mb-0">מצב הבקשה</h2>
          {reportRequests.map((request) => (
            <RequestStatusCard key={request.id} request={request} />
          ))}
        </div>
      )}

      {report.status === "Open" ? (
        renderMatches()
      ) : (
        <p className="notice-success">הפריט הוחזר. אפשר לאסוף את החפץ במשרד האבידות.</p>
      )}

      <Link to="/my-reports" className="link-back">חזרה לדיווחים שלי</Link>
    </div>
  );
};

export default ReportDetailsPage;
