import type { Member, UserRoles } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PROJECT_STATUS, ROLES } from "utils/constant"
import { projectCreationSchema } from "utils/schema"
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

interface CreateProjectDialogProps {
    isOpen: boolean
    onOpenChange: (val: boolean) => void
    workspaceId: string
    workspaceMembers: Member[]
}

export type CreatePorjectFormData = z.infer<typeof projectCreationSchema>

export const CreateProjectDialog = ({ isOpen, workspaceMembers, onOpenChange, workspaceId }: CreateProjectDialogProps) => {

    const { mutate, isPending } = useProjectCreationMutation()

    const form = useForm<CreatePorjectFormData>({
        resolver: zodResolver(projectCreationSchema),
        defaultValues: {
            description: '',
            dueDate: '',
            startDate: '',
            members: [],
            status: PROJECT_STATUS.PLANNING,
            title: ''
        }
    })

    const onSubmit = (values: CreatePorjectFormData) => {
        mutate({
            workspaceId,
            projectData: values
        }, {
            onSuccess: () => {
                toast.success('Project created successfully')
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
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Create a new project to get started
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

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select project status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {
                                                    Object.values(PROJECT_STATUS).map((status) => (<SelectItem value={status}>{status}</SelectItem>))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Input {...field} placeholder="Tags (Separated by comma)" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="members"
                            render={({ field }) => {
                                const selectedMembers = field.value || []
                                return (<FormItem>
                                    <FormLabel>Members <span>({`${selectedMembers.length} member(s) selected`})</span></FormLabel>
                                    <FormControl>
                                        <div className="grid grid-cols-1">
                                            {
                                                workspaceMembers.map(wm => {

                                                    const selectedMember = field.value?.find(mem => mem.user === wm.user._id)
                                                    return (
                                                        <div key={wm._id} className="flex justify-between gap-3 items-center">
                                                            <div className="flex gap-3 items-center">
                                                                <Checkbox id={wm.user.fullName} checked={
                                                                    !!selectedMember
                                                                }
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) {
                                                                            field.onChange([...selectedMembers, {
                                                                                user: wm.user._id,
                                                                                role: ROLES.MEMBER
                                                                            }])
                                                                        } else {
                                                                            field.onChange(selectedMembers.filter(sm => sm.user !== wm.user._id))
                                                                        }
                                                                    }}
                                                                />
                                                                <Label htmlFor={wm.user.fullName}>{wm.user.fullName}</Label>
                                                            </div>

                                                            <Select disabled={!selectedMember} value={selectedMember?.role} onValueChange={(value: UserRoles) => {
                                                                field.onChange([...selectedMembers.filter(sm => sm.user !== wm.user._id), {
                                                                    user: wm.user._id,
                                                                    role: value
                                                                }])
                                                            }}>
                                                                <SelectTrigger className="w-1/2">
                                                                    <SelectValue placeholder="Select user role" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {
                                                                        Object.values(ROLES).map((role) => (<SelectItem key={role} value={role}>{role}</SelectItem>))
                                                                    }
                                                                </SelectContent>
                                                            </Select>
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
                        <Button type="submit" disabled={isPending}>{
                            isPending ? 'Creating...' : 'Create'
                        }</Button>
                    </form>
                </Form>
            </DialogContent >
        </Dialog >
    )
}