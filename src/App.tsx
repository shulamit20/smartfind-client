import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import Header from "./components/Header"

function App() {


  return (
    <>
    <Header/>
    <Outlet/>
    {/* הודעות הצלחה קופצות (toast). העיצוב שלהן ב-index.css תחת .toast */}
    <Toaster position="top-center" dir="rtl" toastOptions={{ unstyled: true, classNames: { toast: "toast", success: "toast-success", error: "toast-error" } }} />
    </>
  )
}

export default App
