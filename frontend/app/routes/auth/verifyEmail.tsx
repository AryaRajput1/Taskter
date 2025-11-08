import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router"
import { ArrowLeft, CheckCircle, CircleCheck, Loader, XCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useEmailVerificationMutation } from "@/hooks/useAuthentication"

const verifyEmail = () => {
    const [searchParams] = useSearchParams()
    const [isSuccess, setIsSuccess] = useState(false)

    const { mutate, isPending: isVerifying } = useEmailVerificationMutation()

    useEffect(() => {
        const token = searchParams.get("token")
        if (!token) {
            setIsSuccess(false)
        } else {
            mutate({
                token,
            }, {
                onSuccess() {
                    setIsSuccess(true)
                },
                onError() {
                    setIsSuccess(false)
                }
            })

        }
    }, [])

    return <div className="flex flex-col items-center justify-center h-screen">
        <Card className="w-full max-w-md mt-2">
            <CardHeader className="flex justify-start items-center">
                <ArrowLeft className="w-4 h-4 text-gray-500" />
                <Link className="text-sm text-gray-500" to="/sign-in">Back to Sign in</Link>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                    {
                        isVerifying ? <>
                            <Loader className="w-10 h-10 text-gray-500 animate-spin" />
                            <h3 className="text-lg font-semibold">Verifying email...</h3>
                            <p className="text-sm text-gray-500 ">Please wait while we verify your email.</p>
                        </> : isSuccess
                            ? <>
                                <CheckCircle className="w-10 h-10 text-green-500" />
                                <h3 className="text-lg font-semibold">Email verified</h3>
                                <p className="text-sm text-gray-500">Your email has been verified</p>
                            </>
                            : <>
                                <XCircle className="w-10 h-10 text-red-500" />
                                <h3 className="text-lg font-semibold">Email verification failed</h3>
                                <p className="text-sm text-gray-500">Your email verification failed. Please try again</p>
                                <Link to="/sign-in" className="text-sm text-blue-500"><Button variant={'outline'}>Back to Sign in</Button></Link>
                            </>
                    }

                </div>
            </CardContent>
        </Card>
    </div>
}

export default verifyEmail;