import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useContext } from "react"
import { AuthContext } from "../context/userContext"
import type { UserLoginInput } from "../types/authLogin"
import { useLogin } from "../hooks/useAuth"
import { Link, Navigate, useNavigate } from "react-router-dom"

const schema = yup
  .object({
    email: yup
      .string()
      .email("כתובת מייל לא תקינה")
      .required("יש להזין אימייל"),
    password: yup
      .string()
      .min(8, "הסיסמה חייבת להכיל לפחות 8 תווים")
      .required("יש להזין סיסמה"),
  })
  .required();

export default function Login() {

    const {login ,user} = useContext(AuthContext);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    })

const loginMutation = useLogin();

if (user) {
  return <Navigate to={user.role === "Admin" ? "/admin/requests" : "/my-reports"} />;
}
const onSubmit = (data: UserLoginInput) => {
  loginMutation.mutate(data, {
    onSuccess: (result) => {
      login(result.user, result.token);

      if (result.user.role === "Admin") {
        navigate("/admin/requests");
      } else {
        navigate("/my-reports");
      }
    },
  });
};
const getErrorMessage = () => {
  const status = loginMutation.error?.response?.status;
  if (status === 401) return "אימייל או סיסמה שגויים";
  if (status === 429) return "יותר מדי ניסיונות, נסו שוב בעוד כמה דקות";
  return "משהו השתבש, נסו שוב";
}; 
       
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <h1 className="auth-title">התחברות</h1>
            <p className="auth-subtitle">טוב לראות אותך שוב.</p>

            <div className="form">
            <div className="field">
            <label htmlFor="email" className="label">אימייל</label>
            <input {...register("email")} id="email" type="email" placeholder="אימייל" className="input"/>
            {errors.email && <p className="field-error">{errors.email.message}</p>}
            </div>

            <div className="field">
            <label htmlFor="password" className="label">סיסמה</label>
            <input {...register("password")} id="password" type="password" placeholder="סיסמה" className="input"/>
            {errors.password && <p className="field-error">{errors.password.message}</p>}
            </div>
           {loginMutation.isError && <p className="alert-error">{getErrorMessage()}</p>}
          <button type="submit" disabled={loginMutation.isPending} className="btn btn-primary mt-2 w-full">
            {loginMutation.isPending ?"בהתחברות..." : "התחברות"}
            </button>

            <p className="text-center text-sm text-muted">
             אין לך חשבון? <Link to="/register" className="link">להרשמה</Link>
            </p>
            </div>
        </form>
    )
}

