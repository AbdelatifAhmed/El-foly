import { toastType } from "@/lib/types"
import { AlertCircle, CheckCircle2 } from "lucide-react"



const Toast = ({type, message}: toastType)  => {

  return (
    <div className="toast toast-top toast-end z-100">
          <div className={`alert ${type === 'success' ? 'alert-success' : 'alert-error'} text-white shadow-lg`}>
            {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
            <span>{message}</span>
          </div>
        </div>
  )
}

export default Toast
