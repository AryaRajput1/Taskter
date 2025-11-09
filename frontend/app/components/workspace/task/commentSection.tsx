import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useCommentByTaskIdQuery, useCommentCreationMutation } from "@/hooks/useComment";
import type { Comment, Member, User } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

export const CommentSection = ({
    taskId,
    members,
}: {
    taskId: string;
    members: Member[];
}) => {
    const [newComment, setNewComment] = useState("");

    const { mutate: addComment, isPending } = useCommentCreationMutation();
    const { data, isLoading } = useCommentByTaskIdQuery<{ comments: Comment[] }>(taskId)

    const { comments } = data || {}

    const handleAddComment = () => {
        if (!newComment.trim()) return;

        addComment(
            { taskId, data: { text: newComment } },
            {
                onSuccess: () => {
                    setNewComment("");
                    toast.success("Comment added successfully");
                },
                onError: (error: any) => {
                    toast.error(error.response.data.message);
                    console.log(error);
                },
            }
        );
    };

    if (isLoading)
        return (
            <div>
                <Loader />
            </div>
        );

    return (
        <div className="bg-card rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Comments</h3>

            <ScrollArea className="max-h-[300px] mb-4">
                {comments?.length ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="flex gap-4 py-2">
                            <Avatar className="size-8">
                                <AvatarImage src={comment.author.profilePicture} />
                                <AvatarFallback>{comment.author.fullName.charAt(0)}</AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-medium text-sm">
                                        {comment.author.fullName}
                                    </span>

                                    <span className="text-xs text-muted-foreground">
                                        {formatDistanceToNow(comment.createdAt, {
                                            addSuffix: true,
                                        })}
                                    </span>
                                </div>

                                <p className="text-sm text-muted-foreground">{comment.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center py-8">
                        <p className="text-sm text-muted-foreground">No comment yet</p>
                    </div>
                )}
            </ScrollArea>

            <Separator className="my-4" />

            <div className="mt-4">
                <Textarea
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />

                <div className="flex justify-end mt-4">
                    <Button
                        disabled={!newComment.trim() || isPending}
                        onClick={handleAddComment}
                    >
                        Post Comment
                    </Button>
                </div>
            </div>
        </div>
    );
};