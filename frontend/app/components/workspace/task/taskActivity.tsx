import Loader from "@/components/Loader";
import { useTaskActivityQuery } from "@/hooks/useTask";
import { getActivityIcon } from "@/lib/getActivityIcon";
import type { Activity } from "@/types";
import { format } from "date-fns";

export const TaskActivity = ({ resourceId }: { resourceId: string }) => {

    const { data, isPending } = useTaskActivityQuery<{ activities: Activity[] }>(resourceId)
    const { activities } = data || {}

    if (isPending) return <Loader />;

    return (
        <div className="bg-card rounded-lg p-6 shadow-sm mb-6">
            <h3 className="text-lg font-medium mb-4">Activity</h3>
            <div className="space-y-4 py-4 max-h-[50vh] overflow-y-auto">
                {activities?.map((activity) => (
                    <div key={activity._id} className="flex gap-2">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {getActivityIcon(activity.action)}
                        </div>

                        <div>
                            <p className="text-sm">
                                <span className="font-medium">{activity.user.fullName}</span>{" "}
                                {activity.details?.description}
                            </p>
                            <span className="text-xs text-gray-500">{format(activity.createdAt, "dd MMM yyy, hh:mm")}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};