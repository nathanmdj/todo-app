import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const Loading = ({isLoading}: {isLoading: boolean}) => {
  return (
      <div className={`absolute top-[-1.25rem] left-1/2 -translate-x-1/2 bg-gray-100 bg-opacity-50 h-full w-full items-center justify-center ${isLoading ? 'flex' : 'hidden'}`}>
        <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        </div>
      </div>  
  )
}

export default Loading