import type { ReactNode } from "react";

// מסך מפוצל לעמודי התחברות והרשמה: פאנל צבעוני + הטופס (children)
type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth">
      <aside className="auth-panel">
        <span className="app-logo auth-logo">SmartFind</span>
        <div className="auth-intro">
          <h2 className="auth-headline">כל מה שאבד,<br />מוצא את הדרך הביתה.</h2>
          <p className="auth-text">מדווחים על האבדה, ואנחנו משווים אותה לחפצים שנמסרו למשרד ומציגים התאמות.</p>
        </div>
        <p className="auth-foot">מחלקת אבדות ומציאות</p>
      </aside>
      <main className="auth-main">{children}</main>
    </div>
  );
};

export default AuthLayout;
