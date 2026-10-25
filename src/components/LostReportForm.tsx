import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useLookups } from "../hooks/useLookups";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateLostReport, useUpdateLostReport } from "../hooks/useLostReports";
import type { LostReport } from "../types/lostReport";

const schema = yup
  .object({
    title: yup.string().required("יש להזין כותרת").min(3, "לפחות 3 תווים"),
    description: yup.string().required("יש להזין תיאור"),
    categoryId: yup
      .number()
      .typeError("יש לבחור קטגוריה")
      .required("יש לבחור קטגוריה"),
    colorId: yup
      .number()
      .typeError("יש לבחור צבע")
      .required("יש לבחור צבע"),
    locationId: yup
      .number()
      .typeError("יש לבחור מיקום")
      .required("יש לבחור מיקום"),
    lostDate: yup.string().required("יש לבחור תאריך"),
  })
  .required();

type LostReportFormValues = yup.InferType<typeof schema>;
type LostReportFormProps = {
  existingReport?: LostReport;
};

export default function LostReportForm({existingReport}:LostReportFormProps) {
    const navigate = useNavigate();
  const { data: lookups, isLoading, error } = useLookups();
  const createMutation = useCreateLostReport();
  const updateMutation = useUpdateLostReport();

 
    
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LostReportFormValues>({
    resolver: yupResolver(schema),
   defaultValues: existingReport
  ? {
      title: existingReport.title,
      description: existingReport.description,
      categoryId: existingReport.category.id,
      colorId: existingReport.color.id,
      locationId: existingReport.location.id,
      lostDate: existingReport.lostDate.split("T")[0],
    }
  : undefined,
  });

   if (isLoading) return <p className="loader">בטעינה</p>;
  if (error) return <p className="alert-error">שגיאה בטעינת הרשימות</p>;

  const onSubmit = (data: LostReportFormValues) => {
  if (existingReport) {
    updateMutation.mutate(
      { id: existingReport.id, data },
      { onSuccess: () => {
          toast.success("הדיווח עודכן בהצלחה");
          navigate("/my-reports");
        } }
    );
  } else {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("הדיווח נוסף בהצלחה");
        navigate("/my-reports");
      },
    });
  }
};
  

 const getErrorMessage = () => {
  const status = existingReport
    ? updateMutation.error?.response?.status
    : createMutation.error?.response?.status;

  if (status === 400) return "חלק מהנתונים לא תקינים, בדקי את השדות";
  if (status === 401) return "פג תוקף ההתחברות, יש להתחבר מחדש";
  return "משהו השתבש, נסו שוב";
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
      <label htmlFor="lostDate" className="label">תאריך אבדה</label>
      <input type="date"  {...register("lostDate")} id="lostDate" className="input" />
      {errors.lostDate && <p className="field-error">{errors.lostDate.message}</p>}
      </div>

      {(createMutation.isError || updateMutation.isError) && <p className="alert-error">{getErrorMessage()}</p>}

      <div className="form-actions">
      <button
  type="submit"
  disabled={createMutation.isPending || updateMutation.isPending}
  className="btn btn-primary"
>
  {existingReport ? "שמור שינויים" : "הוסף דיווח"}
    </button>
      </div>
    </form>
  );
}
