import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useCreateOwnershipRequest } from "../hooks/useOwnershipRequests";


const schema = yup
  .object({
    answer: yup.string().required("יש לענות על השאלה"),
  })
  .required();

type ClaimFormValues = yup.InferType<typeof schema>;

type ClaimFormProps = {
  foundItemId: number;
  reportId: number;
  question: string;
};
export default function ClaimForm({ foundItemId,reportId,question }: ClaimFormProps)
{
     const claimMutation = useCreateOwnershipRequest();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimFormValues>({
    resolver: yupResolver(schema),
  });
  const onSubmit=(data: ClaimFormValues)=>{
    claimMutation.mutate(
        {
      lostReportId: reportId,
      foundItemId,
      answer: data.answer,
    }
    )
  
  };
    if(claimMutation.isSuccess) {
    return <p className="notice-success">הבקשה נשלחה וממתינה לבדיקת מנהל.</p>;
  }
   const getErrorMessage = () => {
    const status = claimMutation.error?.response?.status;
    if (status === 409) return "כבר שלחת בקשה על החפץ הזה, או שהוא כבר הוחזר";
    return "משהו השתבש, נסי שוב";
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <div className="field gap-3">
      <label htmlFor="answer" className="claim-question">{question}</label>
      <textarea {...register("answer")} id="answer" placeholder="התשובה שלך" className="textarea" />
      {errors.answer && <p className="field-error">{errors.answer.message}</p>}
      </div>

      {claimMutation.isError && <p className="alert-error">{getErrorMessage()}</p>}

      <button type="submit" disabled={claimMutation.isPending} className="btn btn-primary w-full sm:w-auto sm:justify-self-start">
        {claimMutation.isPending ? "שולחת..." : "שליחת בקשה"}
      </button>
    </form>
  );

}