import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLookups } from "../hooks/useLookups";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateFoundItem } from "../hooks/useFoundItems";

const schema = yup
  .object({
    title: yup.string().required("יש להזין כותרת").min(3, "לפחות 3 תווים"),
    description: yup.string().required("יש להזין תיאור"),
    categoryId: yup.number().typeError("יש לבחור קטגוריה").required("יש לבחור קטגוריה"),
    colorId: yup.number().typeError("יש לבחור צבע").required("יש לבחור צבע"),
    locationId: yup.number().typeError("יש לבחור מיקום").required("יש לבחור מיקום"),
    foundDate: yup.string().required("יש לבחור תאריך"),
    verificationQuestion: yup.string().required("יש להזין שאלת אימות"),
    verificationAnswer: yup.string().required("יש להזין תשובה נכונה"),
  })
  .required();

type FoundItemFormValues = yup.InferType<typeof schema>;
export default function FoundItemForm() {
    const navigate = useNavigate();
  const { data: lookups, isLoading, error } = useLookups();
  const createMutation = useCreateFoundItem();
    
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FoundItemFormValues>({
    resolver: yupResolver(schema),
  });

   if (isLoading) return <p className="loader">בטעינה</p>;
  if (error) return <p className="alert-error">שגיאה בטעינת הרשימות</p>;

  const onSubmit = (data: FoundItemFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("החפץ נשמר בהצלחה");
        navigate("/admin/found-items");
      },
    });
  };

  const getErrorMessage = () => {
    const status = createMutation.error?.response?.status;
    if (status === 400) return "חלק מהנתונים לא תקינים, בדקי את השדות";
    if (status === 401) return "פג תוקף ההתחברות, יש להתחבר מחדש";
    return "משהו השתבש, נסי שוב";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="field">
      <label htmlFor="title" className="label">כותרת</label>
      <input {...register("title")} id="title" placeholder="למשל: תיק גב שחור" className="input" />
      {errors.title && <p className="field-error">{errors.title.message}</p>}
      </div>

      <div className="field">
      <label htmlFor="description" className="label">תיאור</label>
      <textarea {...register("description")} id="description" className="textarea" />
      {errors.description && <p className="field-error">{errors.description.message}</p>}
      </div>

      <div className="form-row">
      <div className="field">
      <label htmlFor="categoryId" className="label">קטגוריה</label>
      <select {...register("categoryId")} id="categoryId" className="select">
        <option value="">בחרי קטגוריה</option>
        {lookups?.categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.categoryId && <p className="field-error">{errors.categoryId.message}</p>}
      </div>

      <div className="field">
      <label htmlFor="colorId" className="label">צבע</label>
      <select {...register("colorId")} id="colorId" className="select">
        <option value="">בחרי צבע</option>
        {lookups?.colors.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.colorId && <p className="field-error">{errors.colorId.message}</p>}
      </div>

      <div className="field">
      <label htmlFor="locationId" className="label">מיקום</label>
      <select {...register("locationId")} id="locationId" className="select">
        <option value="">בחרי מיקום</option>
        {lookups?.locations.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>
      {errors.locationId && <p className="field-error">{errors.locationId.message}</p>}
      </div>
      </div>

      <div className="field form-short">
      <label htmlFor="foundDate" className="label">תאריך מציאה</label>
      <input type="date"  {...register("foundDate")} id="foundDate" className="input" />
      {errors.foundDate && <p className="field-error">{errors.foundDate.message}</p>}
      </div>

      <div className="verify-box">
      <div className="field">
   <label htmlFor="verificationQuestion" className="label">שאלת אימות</label>
<input
  {...register("verificationQuestion")}
  id="verificationQuestion"
  placeholder="למשל: איזה צבע המדבקה על התיק?"
  className="input bg-surface"
/>
     <p className="hint">שאלה שרק הבעלים יודע, ואין לה תשובה בתיאור הפריט.</p>
     {errors.verificationQuestion && <p className="field-error">{errors.verificationQuestion.message}</p>}
      </div>

      <div className="field">
     <label htmlFor="verificationAnswer" className="label">תשובה נכונה</label>
     <input {...register("verificationAnswer")} id="verificationAnswer" className="input bg-surface" />
     <p className="hint">התשובה לא תוצג למשתמשים.</p>
     {errors.verificationAnswer && <p className="field-error">{errors.verificationAnswer.message}</p>}
      </div>
      </div>
      {createMutation.isError && <p className="alert-error">{getErrorMessage()}</p>}

      <div className="form-actions">
      <button type="submit" disabled={createMutation.isPending} className="btn btn-primary">
      {createMutation.isPending ? "שומרת..." : " שמירת חפץ"}
      </button>
      </div>
    </form>
  );
}
