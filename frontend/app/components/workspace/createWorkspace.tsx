import { COLORS } from "@/lib/constants"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { workspaceCreationSchema } from "utils/schema"
import type z from "zod"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { cn } from "@/lib/utils"
import { is } from "zod/v4/locales"
import { useCreateWorkspaceMutation } from "@/hooks/useWorkspace"
import { toast } from "sonner"

interface CreateWorkspaceProps {
    isCreatingWorkspace: boolean
    setIsCreatingWorkspace: (status: boolean) => void
}

type WorkspaceForm = z.infer<typeof workspaceCreationSchema>
export const CreateWorkspace = ({
    isCreatingWorkspace,
    setIsCreatingWorkspace
}: CreateWorkspaceProps) => {

    const { mutate, isPending } = useCreateWorkspaceMutation()

    const form = useForm<WorkspaceForm>({
        resolver: zodResolver(workspaceCreationSchema),
        defaultValues: {
            color: COLORS[0],
            name: '',
            description: ''
        }
    })

    const onSubmit = (values: WorkspaceForm) => {
        mutate(values, {
            onSuccess() {
                toast.success("Workspace created successfully")
                form.reset()
                setIsCreatingWorkspace(false)
            }, onError(error) {
                console.log(error)
                toast.error("There is some error creating workspace")
            }
        })
    }
    return (
        <Dialog open={isCreatingWorkspace} onOpenChange={setIsCreatingWorkspace} modal={true}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Workspace</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workspace Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter workspace name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workspace Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter workspace description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="color"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Workspace Color</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-2">
                                            {
                                                COLORS.map(color => (
                                                    <button type="button" onClick={() => field.onChange(color)} style={{ background: color }} key={color} className={
                                                        cn("size-6 rounded-full cursor-pointer hover:ring-2 ring-offset-1 ring-gray-400 hover:opacity-80 transition-all duration-200", field.value === color && "ring-2 ring-gray-400")
                                                    }>

                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending}>{
                            isPending ? 'Creating...' : 'Create'
                        }</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}