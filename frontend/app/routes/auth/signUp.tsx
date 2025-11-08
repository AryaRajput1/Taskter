import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSignupMutation } from "@/hooks/useAuthentication"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"
import { signUpSchema } from "utils/schema"
import { z } from "zod"

type SignUpFormType = z.infer<typeof signUpSchema>

const SignUp = () => {
    const navigate = useNavigate()
    // 1. Define your form.
    const form = useForm<SignUpFormType>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
            confirmPassword: ""
        },
    })

    const { mutate, isPending } = useSignupMutation<unknown, SignUpFormType>()

    function onSubmit(values: SignUpFormType) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        mutate(values, {
            onSuccess: () => {
                toast.success("Account creation pending, Verification required", {
                    description: "Please check your email for verificaition, Check spam folder too."
                })

                form.reset()
                navigate("/login", {
                    replace: true
                })
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
                <CardTitle className="text-3xl font-bold">Welcome!</CardTitle>
                <CardDescription>Create an account to continue</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Full Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Enter full name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Enter password" {...field} />
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
                        <Button variant={'primary'} className="w-full">Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <div className="text-center w-full">
                    <p>
                        already have an account?{" "}
                        <Link to='/login' className="text-blue-500 hover:underline">Login</Link>
                    </p>
                </div>
            </CardFooter>
        </Card>

    </div>
}

export default SignUp

