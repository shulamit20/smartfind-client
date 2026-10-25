import { Link } from "react-router-dom";
import type { LostReport } from "../types/lostReport";

type ReportCardProps={
 report: LostReport;
}
const ReportCard=({report}:ReportCardProps)=>
{
return(<div className="flex-1">
  <Link to={`/my-reports/${report.id}`} className="grid h-full grid-cols-[1fr_auto] content-start items-center gap-x-3 gap-y-2 p-6">
      <h3 className="col-span-2 row-start-2 mt-4 font-display text-[22px] font-bold leading-snug transition-colors duration-300 group-hover:text-accent">{report.title}</h3>
        <p className="col-start-1 row-start-1 text-xs font-semibold text-muted">קטגוריה: {report.category.name}</p>
        <p className="ticket-cut col-span-2 row-start-3 -mx-6 mt-4 -mb-6 px-6 py-3.5 text-[13px] text-muted">תאריך אבדה: {new Date(report.lostDate).toLocaleDateString("he-IL")}</p>
        <p className="badge col-start-2 row-start-1" data-status={report.status}>סטטוס: {report.status === "Open" ? "פתוח" : "הוחזר"}</p>
  </Link>

 </div>)
}
export default ReportCard
