import { useState } from "react";
import { toast } from "sonner";
import type { OwnershipRequest } from "../types/ownershipRequest";
import { useApproveRequest, useRejectRequest } from "../hooks/useOwnershipRequests";

type RequestCardProps = {
  request: OwnershipRequest;
};

const RequestCard = ({ request }: RequestCardProps) => {
  const approveMutation = useApproveRequest();
  const rejectMutation = useRejectRequest();
  const [reason, setReason] = useState("");
  const [showReject, setShowReject] = useState(false);

  const handleApprove = () => {
    if (window.confirm("לאשר את הבקשה? החפץ יסומן כהוחזר.")) {
      approveMutation.mutate(request.id, {
        onSuccess: () => toast.success("הבקשה אושרה. החפץ סומן כהוחזר"),
      });
    }
  };

  const handleReject = () => {
    rejectMutation.mutate(
      { id: request.id, rejectionReason: reason },
      { onSuccess: () => toast.success("הבקשה נדחתה") }
    );
  };

  return (
    <div className="request-card card card-hover">
      <div className="request-head">
        <div>
          <h3 className="request-title">{request.foundItem.title}</h3>
          <div className="request-meta">
            <p>נשלחה על ידי: <span className="font-semibold text-ink">{request.user?.fullName}</span></p>
            <p>מתוך הדיווח: {request.lostReport.title}</p>
            <p>נשלחה בתאריך: {new Date(request.createdAt).toLocaleDateString("he-IL")}</p>
          </div>
        </div>
        <span className="badge" data-status="Pending">ממתינה</span>
      </div>

      <div className="request-check">
        <h3 className="request-question">שאלת אימות: {request.verificationQuestion}</h3>
        <div className="answers">
          <p className="answer answer-correct"><span className="answer-label">התשובה הנכונה</span>{request.correctAnswer}</p>
          <p className="answer"><span className="answer-label">תשובת המשתמש</span>{request.answer}</p>
        </div>
      </div>

      <div className="request-actions">
      <button onClick={handleApprove} disabled={approveMutation.isPending} className="btn btn-primary">
        אישור
      </button>
      <button onClick={() => setShowReject(true)} className="btn btn-danger-outline">דחייה</button>
      </div>

      {showReject && (
        <div className="reject-box">
          <input
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="סיבת הדחייה (לפחות 5 תווים)"
            className="input flex-1 bg-surface"
          />
          <button
            onClick={handleReject}
            disabled={reason.trim().length < 5 || rejectMutation.isPending}
            className="btn btn-danger"
          >
            אישור דחייה
          </button>
        </div>
      )}

      {(approveMutation.isError || rejectMutation.isError) && (
        <p className="alert-error mt-4">הפעולה נכשלה. ייתכן שהבקשה כבר טופלה.</p>
      )}
    </div>
  );
};

export default RequestCard;
