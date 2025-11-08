import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { resetPasswordSchema } from "utils/schema"
import type z from "zod"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Link, useNavigate, useSearchParams } from "react-router"
import { useResetPasswordMutation } from "@/hooks/useAuthentication"
import { toast } from "sonner"

type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>

const resetPassword = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const token = searchParams.get('token')

    const { mutate, isPending } = useResetPasswordMutation()

    const form = useForm<ResetPasswordFormType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
            token: token || "",
        }
    })

    function onSubmit(values: ResetPasswordFormType) {
        mutate({
            ...values,
            token,
        }, {
            onSuccess: () => {
                toast.success("Password reset successfully.")
                form.reset()
                navigate("/login")
            },
            onError: (error: any) => {
                const errorMessage = error.response.data.message || "An error occured"
                console.log(errorMessage)

                toast.error(errorMessage)
            }
        })
    }

    return <div className="min-h-screen w-full flex flex-col items-center justify-center bg-muted/40 p-4">
        <div>
            <h1 className="text-2xl font-semibold mb-2">Reset Password</h1>
        </div>
        <Card className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/4 gap-4">
            <CardHeader className="flex justify-start items-center">
                <ArrowLeft className="w-4 h-4 text-gray-500" />
                <Link className="text-sm text-gray-500" to="/login">Back to Sign in</Link>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        New Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter new password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Confirm Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter confirm password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="token"
                            render={({ field }) => (
                                <FormItem className="hidden">
                                    <FormControl>
                                        <Input type="password" placeholder="Enter confirm password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button variant={'primary'} className="w-full" disabled={isPending}>
                            {isPending ? <Loader2 className="size-4 mr-2" /> : 'Login'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

    </div>
}
export default resetPassword