interface WorkspaceProps {
    color: string
    name: string
}
const WorkspaceAvatar = ({
    color,
    name
}: WorkspaceProps) => {
    return (
        <div className="size-6 rounded flex items-center justify-center"
            style={{
                background: color
            }}
        >
            <span className="text-xs font-medium text-white">
                {
                    name.charAt(0).toUpperCase()
                }
            </span>
        </div>
    )
}
export default WorkspaceAvatar