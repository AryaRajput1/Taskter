import { useNavigate } from "react-router"
import { Button } from "./ui/button"
import { ChevronLeft } from "lucide-react"

export const BackButton = () => {
    const navigate = useNavigate()

    return (
        <Button variant={'outline'} onClick={() => navigate(-1)}>
            <ChevronLeft className="size-4" />
            <span>Back</span>
        </Button>
    )
}