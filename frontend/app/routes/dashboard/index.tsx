import { RecentProjects } from "@/components/dashboard/recentProjects";
import { StatisticsCharts } from "@/components/dashboard/statisticsChart";
import { StatsCard } from "@/components/dashboard/statsCard";
import { UpcomingTasks } from "@/components/dashboard/upcomingTasks";
import Loader from "@/components/Loader";
import { useGetWorkspacesStatsQuery } from "@/hooks/useWorkspace";
import type { Project, ProjectStatusData, StatsData, Task, TaskPriorityData, TaskTrendsData, WorkspaceProductivityData } from "@/types";
import { useSearchParams } from "react-router";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId");

  const { data, isPending } = useGetWorkspacesStatsQuery<{
    stats: StatsData;
    taskTrendsData: TaskTrendsData[];
    projectStatusData: ProjectStatusData[];
    taskPriorityData: TaskPriorityData[];
    workspaceProductivityData: WorkspaceProductivityData[];
    upcomingTasks: Task[];
    recentProjects: Project[];
  }>(workspaceId!);

  if (isPending) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div>No stats found.</div>
  }

  return (
    <div className="space-y-8 2xl:space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <StatsCard data={data?.stats} />

      <StatisticsCharts
        stats={data.stats}
        taskTrendsData={data.taskTrendsData}
        projectStatusData={data.projectStatusData}
        taskPriorityData={data.taskPriorityData}
        workspaceProductivityData={data.workspaceProductivityData}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentProjects data={data.recentProjects} />
        <UpcomingTasks data={data.upcomingTasks} />
      </div>
    </div>
  );
};

export default Dashboard;