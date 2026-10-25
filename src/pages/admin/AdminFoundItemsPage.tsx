import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useFoundItems, useDeleteFoundItem } from "../../hooks/useFoundItems";
import { useLookups } from "../../hooks/useLookups";

const AdminFoundItemsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { data, isLoading, error } = useFoundItems();
  const { data: lookups, isError: lookupsError } = useLookups();
  const deleteMutation = useDeleteFoundItem();

  if (isLoading) return <p className="loader">בטעינה</p>;
  if (error) return (
    <div className="page">
      <p className="alert-error">שגיאה בטעינת הפריטים</p>
    </div>
  );

  const items = data?.items ?? [];

  const filteredItems = items.filter(
    (item) => selectedCategory === null || item.category.id === selectedCategory
  );

  return (
    <div className="page">
      <div className="page-head animate-rise">
      <h1 className="page-title">ניהול פריטים</h1>
      <Link to="/admin/found-items/new" className="btn btn-primary">+ הוספת פריט</Link>
      </div>

      <div className="filter-bar">
        <select
          className="select sm:w-64"
          value={selectedCategory ?? ""}
          onChange={(e) =>
            setSelectedCategory(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">כל הקטגוריות</option>
          {lookups?.categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {lookupsError && <p className="text-[13px] text-rejected">לא ניתן לטעון את הקטגוריות לסינון.</p>}
      </div>

      {deleteMutation.isError && (
        <p className="alert-error mb-5">המחיקה נכשלה. ייתכן שהפריט כבר הוחזר. נסו לרענן את הדף.</p>
      )}

      {filteredItems.length === 0 ? (
        <p className="empty">
          {selectedCategory === null
            ? "עדיין לא נרשמו פריטים."
            : "אין פריטים בקטגוריה הזו."}
        </p>
      ) : (
        <div className="card table-card">
        <table className="table">
          <thead>
            <tr>
              <th>שם הפריט</th>
              <th>קטגוריה</th>
              <th>תאריך מציאה</th>
              <th>סטטוס</th>
              <th className="w-px">פעולות</th>
            </tr>
          </thead>
          <tbody className="enter">
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td data-label="שם הפריט" className="font-semibold">{item.title}</td>
                <td data-label="קטגוריה" className="text-muted">{item.category.name}</td>
                <td data-label="תאריך מציאה" className="text-muted tabular-nums">{new Date(item.foundDate).toLocaleDateString("he-IL")}</td>
                <td data-label="סטטוס"><span className="badge" data-status={item.status}>{item.status === "Available" ? "זמין" : "הוחזר"}</span></td>
                <td data-label="פעולות">
                  {item.status === "Available" && (
                    <button
                      onClick={() => {
                        if (window.confirm("למחוק את הפריט? גם הבקשות הממתינות עליו יימחקו.")) {
                          deleteMutation.mutate(item.id, {
                            onSuccess: () => toast.success("הפריט נמחק"),
                          });
                        }
                      }}
                      disabled={deleteMutation.isPending}
                      className="btn btn-danger-outline btn-sm btn-delete"
                    >
                      מחיקה
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default AdminFoundItemsPage;