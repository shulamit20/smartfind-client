import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AuthContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useAuth";


const schema = yup
  .object({
    fullName: yup.string().required("יש להזין שם מלא"),
    email: yup
      .string()
      .email("כתובת מייל לא תקינה")
      .required("יש להזין אימייל"),
    password: yup
      .string()
      .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
      .required("יש להזין סיסמה"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "הסיסמאות אינן תואמות")
      .required("יש לאמת את הסיסמה"),
  })
  .required();

type RegisterFormValues = yup.InferType<typeof schema>;

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    const { confirmPassword, ...userData } = data;

    registerMutation.mutate(userData, {
      onSuccess: (result) => {
        login(result.user, result.token);
        navigate("/my-reports");
      },
    });
  };

  const getErrorMessage = () => {
    const status = registerMutation.error?.response?.status;
    if (status === 409) return "האימייל תפוס";
    if (status === 429) return "יותר מדי ניסיונות, נסו שוב בעוד כמה דקות";
    return "משהו השתבש, נסו שוב";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h1 className="auth-title">הרשמה</h1>
      <p className="auth-subtitle">פתיחת חשבון לוקחת פחות מדקה.</p>

      <div className="form gap-4">
      <div className="field">
      <label htmlFor="fullName" className="label">שם מלא</label>
      <input {...register("fullName")} id="fullName" placeholder="שם מלא" className="input" />
      <p className="field-error">{errors.fullName?.message}</p>
      </div>

      <div className="field">
      <label htmlFor="email" className="label">אימייל</label>
      <input {...register("email")} id="email" type="email" placeholder="אימייל" className="input" />
      <p className="field-error">{errors.email?.message}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-3">
      <div className="field">
      <label htmlFor="password" className="label">סיסמה</label>
      <input {...register("password")} id="password" type="password" placeholder="סיסמה" className="input" />
      <p className="field-error">{errors.password?.message}</p>
      </div>

      <div className="field">
      <label htmlFor="confirmPassword" className="label">אימות סיסמה</label>
      <input
        {...register("confirmPassword")}
        id="confirmPassword"
        type="password"
        placeholder="אימות סיסמה"
        className="input"
      />
      <p className="field-error">{errors.confirmPassword?.message}</p>
      </div>
      </div>

      {registerMutation.isError && <p className="alert-error">{getErrorMessage()}</p>}

      <button type="submit" disabled={registerMutation.isPending} className="btn btn-primary mt-2 w-full">
        {registerMutation.isPending ? "בהרשמה..." : "הרשמה"}
      </button>

      <p className="text-center text-sm text-muted">
       כבר יש לך חשבון? <Link to="/login" className="link">להתחברות</Link>
      </p>
      </div>
    </form>
  );
}