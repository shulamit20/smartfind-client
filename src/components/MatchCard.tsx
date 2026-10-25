import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import type { Match } from "../types/foundItem";



type MatchCardProps={
   match: Match;
  reportId: number;
}


const MatchCard=({match,reportId}:MatchCardProps)=>{
    return (
    <div className="card card-hover match-card">
          <h3 className="match-title">{match.foundItem.title}</h3>
          <p className="match-meta">
            נמצא ב{match.foundItem.location.name} ·{" "}
            {new Date(match.foundItem.foundDate).toLocaleDateString("he-IL")}
          </p>
          {/* הטבעת: הערך עובר ל-CSS דרך המשתנה --p. הטקסט המקורי נשאר לקוראי מסך */}
          <div className="meter" style={{ "--p": Math.round((match.score / 80) * 100) } as CSSProperties}>
          <p className="sr-only">התאמה: {Math.round((match.score / 80) * 100)}%</p>
          </div>
          <p className="checks">
            <span className="check" data-ok={match.breakdown.category}>קטגוריה {match.breakdown.category ? "✓" : "✗"}</span>
            <span className="check" data-ok={match.breakdown.color}>צבע {match.breakdown.color ? "✓" : "✗"}</span>
            <span className="check" data-ok={match.breakdown.location}>מיקום {match.breakdown.location ? "✓" : "✗"}</span>
          </p>

        <Link to={`/found-items/${match.foundItem.id}?reportId=${reportId}`} className="btn btn-primary match-cta">
             זה שלי
            </Link>
           </div>
      )}
export default MatchCard
