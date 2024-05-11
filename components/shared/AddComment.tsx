"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";

const formSchema = z.object({
  comment: z
    .string()
    .min(2, "Comment should contain atleast 2 characters")
    .max(200, "Too long, maximum 200 characters"),
});

interface AddCommentProps {
  commentor: string;
  onSubmit: (comment: string) => void;
}

const AddComment = ({ commentor, onSubmit }: AddCommentProps) => {
  const [comment, setComment] = useState("");
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    onSubmit(values.comment);
    setComment(""); // Reset comment field after submitting
    // Close the dialog
    form.reset(); // Reset form values
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex flex-row gap-2">
          <Image
            width={25}
            height={25}
            src="/emptyComment.svg"
            alt="comment"
            className="invert-image"
          />
          <span>Add Comment</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
          <DialogDescription>Enter your comment below.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter comment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose>
              <Button type="submit">Add Comment</Button>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddComment;
