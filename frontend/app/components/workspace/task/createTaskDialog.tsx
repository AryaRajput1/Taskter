import type { Member, Project, UserRoles } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PROJECT_STATUS, ROLES, TASK_PRIORITY, TASK_STATUS } from "utils/constant"
import { projectCreationSchema, taskCreationSchema } from "utils/schema"
import type z from "zod"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { file } from "zod"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useProjectCreationMutation } from "@/hooks/useProject"
import { toast } from "sonner"
import { useTaskCreationMutation } from "@/hooks/useTask"

interface CreateTaskDialogProps {
    isOpen: boolean
    onOpenChange: (val: boolean) => void
    projectId: string
    projectMembers?: Member[]
}

export type CreateTaskFormData = z.infer<typeof taskCreationSchema>

export const CreateTaskDialog = ({ isOpen, projectMembers, onOpenChange, projectId }: CreateTaskDialogProps) => {

    const { mutate, isPending } = useTaskCreationMutation()

    const form = useForm<CreateTaskFormData>({
        resolver: zodResolver(taskCreationSchema),
        defaultValues: {
            description: '',
            dueDate: '',
            startDate: '',
            assignees: [],
            status: TASK_STATUS.TO_DO,
            priority: TASK_PRIORITY.LOW,
            title: ''
        }
    })

    const onSubmit = (values: CreateTaskFormData) => {
        mutate({
            projectId,
            taskData: values
        }, {
            onSuccess: () => {
                toast.success('Task created successfully')
                onOpenChange(false)
                form.reset()
            },
            onError: (error) => {
                toast.error(error.message || 'Something went wrong')
            }
        })
    }


    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[540px]">
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                    <DialogDescription>
                        Create a new task to get started
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter title" {...field} />
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
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid gap-4 md:grid-cols-2">

                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select task status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.values(TASK_STATUS).map((status) => (<SelectItem value={status}>{status}</SelectItem>))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="priority"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Priority</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select task priority" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {
                                                        Object.values(TASK_PRIORITY).map((priority) => (<SelectItem value={priority}>{priority}</SelectItem>))
                                                    }
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Start Date</FormLabel>
                                        <FormControl>
                                            <Popover modal={true}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        className="w-full justify-between font-normal"
                                                    >
                                                        {field.value ? format(field.value, "PPPP") : "Select date"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            field.onChange(date?.toISOString())
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="dueDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>
                                            <Popover modal={true}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date"
                                                        className="w-full justify-between font-normal"
                                                    >
                                                        {field.value ? format(field.value, "PPPP") : "Select date"}
                                                        <ChevronDownIcon />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        captionLayout="dropdown"
                                                        onSelect={(date) => {
                                                            field.onChange(date?.toISOString())
                                                        }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="assignees"
                            render={({ field }) => {
                                const selectedMembers = field.value || []
                                return (<FormItem>
                                    <FormLabel>Members <span>({`${selectedMembers.length} member(s) selected`})</span></FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-1">
                                            {
                                                projectMembers?.map(pm => {
                                                    const selectedMember = field.value?.find(mem => mem === pm.user._id)
                                                    return (
                                                        <div key={pm._id} className="flex justify-between gap-3 items-center">
                                                            <div className="flex gap-3 items-center">
                                                                <Checkbox id={pm.user.fullName} checked={
                                                                    !!selectedMember
                                                                }
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) {
                                                                            field.onChange([...selectedMembers, pm.user._id
                                                                            ])
                                                                        } else {
                                                                            field.onChange(selectedMembers.filter(sm => sm !== pm.user._id))
                                                                        }
                                                                    }}
                                                                />
                                                                <Label htmlFor={pm.user.fullName}>{pm.user.fullName}</Label>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>)
                            }
                            }
                        />

                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>{
                                isPending ? 'Creating...' : 'Create'
                            }</Button>
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent >
        </Dialog >
    )
}