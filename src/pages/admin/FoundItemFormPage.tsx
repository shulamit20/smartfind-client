import { Link } from "react-router-dom";
import FoundItemForm from "../../components/FoundItemForm";

const FoundItemFormPage = () => {
  return (
    <div className="page-narrow">
      <h1 className="page-title animate-rise">הוספת חפץ שנמצא</h1>
      <p className="page-lead animate-rise">
        רשמי כאן חפץ שנמסר למשרד. אחרי השמירה הוא יוצע כהתאמה למשתמשים שדיווחו
        על אבדה דומה.
      </p>

      <div className="card form-card">
      <FoundItemForm />
      </div>

      <Link to="/admin/found-items" className="link-back mt-7">חזרה לניהול פריטים</Link>
    </div>
  );
};

export default FoundItemFormPage;