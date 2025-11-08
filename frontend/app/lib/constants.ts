import { CheckCircle2, LayoutDashboard, ListCheck, Network, Settings, Users } from "lucide-react";

export const NAV_ITEMS = [{
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
}, {
    title: 'Workspaces',
    href: '/workspaces',
    icon: Network
}, {
    title: 'My Tasks',
    href: '/my-tasks',
    icon: ListCheck
}, {
    title: 'Members',
    href: '/members',
    icon: Users
}, {
    title: 'Archieved',
    href: '/archieved',
    icon: CheckCircle2
}, {
    title: 'Settings',
    href: '/settings',
    icon: Settings
}]
export const COLORS = [
    '#f67e78', // Coral Red
    '#abab43', // Olive Green
    '#5ab1bb', // Aqua Blue
    '#f9c74f', // Warm Yellow
    '#90be6d', // Fresh Green
    '#577590', // Slate Blue
    '#f9844a'  // Orange
];
