import type { OwnershipRequest } from "../types/ownershipRequest";

type RequestStatusCardProps = {
  request: OwnershipRequest;
};

const RequestStatusCard = ({ request }: RequestStatusCardProps) => {
  const getStatusText = () => {
    if (request.status === "Pending") return "⏳ ממתינה לבדיקת מנהל";
    if (request.status === "Approved") return "✓ אושרה. אפשר לאסוף את החפץ במשרד האבידות";
    return `✗ נדחתה: ${request.rejectionReason}`;
  };

  return (
    <div className="card status-card" data-status={request.status}>
      <h3 className="card-title">{request.foundItem.title}</h3>
      <p className="card-meta sm:row-start-2">נשלחה ב-{new Date(request.createdAt).toLocaleDateString("he-IL")}</p>
      <p className="badge whitespace-normal py-1.5" data-status={request.status}>{getStatusText()}</p>
    </div>
  );
};

export default RequestStatusCard;
