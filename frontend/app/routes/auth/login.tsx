import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useLoginMutation } from "@/hooks/useAuthentication"
import { useAuth } from "@/provider/authContextProvider"
import type { User } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { loginSchema } from "utils/schema"
import { z } from "zod"

type LoginFormType = z.infer<typeof loginSchema>

const Login = () => {
    const { login } = useAuth()
    const { mutate, isPending } = useLoginMutation<unknown, { user: User, token: string }>()
    // 1. Define your form.
    const form = useForm<LoginFormType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const navigate = useNavigate()

    function onSubmit(values: LoginFormType) {
        mutate(values, {
            onSuccess: (data) => {
                login({ user: data.user, token: data.token })
                toast.success("Login Successful")

                form.reset()
                navigate('/dashboard')
            },
            onError: (error: any) => {
                const errorMessage = error.response.data.message || "An error occured"
                console.log(errorMessage)

                toast.error(errorMessage)
            }
        })
    }

    return <div className="min-h-screen w-full flex flex-col items-center justify-center bg-muted/40 p-4">
        <Card className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/4 gap-4">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
                <CardDescription>Login to your account to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex justify-between">
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <Link to='/forget-password' className="text-blue-500 hover:underline text-xs">Forget password?</Link>

                                    </div>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter password" {...field} />
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
            <CardFooter>
                <div className="text-center w-full">
                    <p>
                        Don't have an account?{" "}
                        <Link to='/sign-up' className="text-blue-500 hover:underline">Sign Up</Link>
                    </p>
                </div>
            </CardFooter>
        </Card>

    </div>
}

export default Login

