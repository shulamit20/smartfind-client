import { Link, useParams, useSearchParams } from "react-router-dom";
import FoundItemDetails from "../../components/FoundItemDetails";
import ClaimForm from "../../components/ClaimForm";
import { useFoundItem } from "../../hooks/useFoundItems";


const FoundItemDetailsPage=()=>
{
     const { id } = useParams();
  const [searchParams] = useSearchParams();
  const reportId = Number(searchParams.get("reportId"));
const { data: item, isLoading, error } = useFoundItem(Number(id));

  if (isLoading) return <p className="loader">בטעינה</p>;

  if (error || !item) {
    return (
      <div className="page-narrow">
        <div className="empty">
        <p className="mb-4">החפץ לא נמצא.</p>
        <Link to="/my-reports" className="link-back">חזרה לדיווחים שלי</Link>
        </div>
      </div>
    );
  }
  return(

    <div className="page enter grid items-start gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-8">
    <FoundItemDetails item={item} />
      <div className="card">
      <h2 className="mb-5 font-display text-[30px] font-bold leading-tight">זה שלך?</h2>
    <ClaimForm
   foundItemId={item.id}
   reportId={reportId}
   question={item.verificationQuestion}
    />
      </div>
    </div>
  )
}
export default FoundItemDetailsPage