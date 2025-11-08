import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { forgetPasswordSchema } from "utils/schema"
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
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import { Link, useNavigate, useSearchParams } from "react-router"
import { useForgetPasswordMutation } from "@/hooks/useAuthentication"
import { toast } from "sonner"
import { useState } from "react"

type ForgetPasswordFormType = z.infer<typeof forgetPasswordSchema>

const forgetPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false)

  const { isPending, mutate } = useForgetPasswordMutation()

  const form = useForm<ForgetPasswordFormType>({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: ""
    }
  })

  function onSubmit(values: ForgetPasswordFormType) {
    mutate(values, {
      onSuccess: (data) => {
        setIsSuccess(true)
        toast.success("Please check your email for reset password, Check spam folder too.")

        form.reset()
      },
      onError: (error: any) => {
        setIsSuccess(false)
        const errorMessage = error.response.data.message || "An error occured"
        console.log(errorMessage)

        toast.error(errorMessage)
      }
    })
  }

  return <div className="min-h-screen w-full flex flex-col items-center justify-center bg-muted/40 p-4">
    <div>
      <h1 className="text-2xl font-semibold mb-2">Forget Password</h1>
    </div>
    <Card className="w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/4 gap-4">
      <CardHeader className="flex justify-start items-center">
        <ArrowLeft className="w-4 h-4 text-gray-500" />
        <Link className="text-sm text-gray-500" to="/login">Back to Sign in</Link>
      </CardHeader>
      <CardContent>
        {!isSuccess ? <Form {...form}>
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
            <Button variant={'primary'} className="w-full" disabled={isPending}>
              {isPending ? <Loader2 className="size-4 mr-2" /> : 'Forget Password'}
            </Button>
          </form>
        </Form> :
          <div className="flex flex-col items-center">
            <CheckCircle className="w-10 h-10 text-green-500" />
            <h3 className="text-lg font-semibold">Reset password email has been sent </h3>
            <p className="text-sm text-center text-gray-500">Please check your email for reset password, Check spam folder too.</p>
          </div>
        }
      </CardContent>
    </Card>

  </div>
}
export default forgetPassword