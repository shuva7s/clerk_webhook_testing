"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePost } from "@/lib/actions/post.actions";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DeletePost = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const handleDeletionContinue = async () => {
    await deletePost(postId);
    router.replace("/");
    router.refresh();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="border px-4 rounded-md">
        <Image
          src="/delete.svg"
          alt="delete"
          width={16}
          height={16}
          className="invert-image opacity-50"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this Post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="flex gap-2"
            onClick={handleDeletionContinue}
          >
            <Image
              src="/delete.svg"
              alt="delete"
              width={16}
              height={16}
              className="invert-image opacity-80"
            />
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
