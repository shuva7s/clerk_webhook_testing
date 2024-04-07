"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createPost } from "@/lib/actions/post.actions"
import { useRouter } from "next/navigation"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import { useUploadThing } from '@/lib/uploadthing'


const formSchema = z.object({
    authorName: z.string(),
    authorImage: z.string(),
    imageUrl: z.string().optional(), // Make imageUrl optional
    title: z.string().min(2),
    content: z.string().min(2),
})

type CreatePostFormProps = {
    authorData: {
        authorName: string;
        authorImage: string;
    };
}

const CreatePostForm = ({ authorData }: CreatePostFormProps) => {
    const authorName = authorData.authorName;
    const authorImage = authorData.authorImage;
    // console.log(authorName);
    // console.log(authorImage);
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing('imageUploader');
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            authorName: authorName,
            authorImage: authorImage,
            title: "",
            content: "",
            imageUrl: "", // This will be ignored if no image is uploaded
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (files.length > 0) {
            const uploadedImages = await startUpload(files)

            if (!uploadedImages) {
                return
            }

            // Update values.imageUrl with the uploaded image URL
            values.imageUrl = uploadedImages[0].url
        }
        console.log(values);
        try {
            await createPost(values);
            form.reset();
            router.push(`/`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormControl className="h-72">
                                <FileUploader
                                    onFieldChange={field.onChange}
                                    imageUrl={field.value || ""}
                                    setFiles={setFiles}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter content" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    size="lg"
                    disabled={form.formState.isSubmitting}
                    className="button col-span-2 w-full"
                >
                    {form.formState.isSubmitting ? (
                        'Creating Post...'
                    ) : 'Create Post'}</Button>
            </form>
        </Form>
    )
}

export default CreatePostForm;
