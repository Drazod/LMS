import { useState, useEffect } from "react";

// import { useDispatch } from "react-redux";
import { getUserDataFromLocal } from "@/utils/getUserDataFromLocal";
import "ldrs/tailspin";
import { api } from "@/lib/api";

type Category = {
  categoryId: number;
  categoryName: string;
};

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be non-negative"),
  categoryId: z.coerce.number().int().min(1, "Category is required"),
  courseThumbnail: z
    .instanceof(File, { message: "Course thumbnail is required" })
    .refine((f) => f && f.size > 0, "Course thumbnail is required"),
});

const CreateCourse = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      categoryId: 0,
      courseThumbnail: undefined as unknown as File,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const fd = new FormData();
      fd.append("instructorId", String(userID));
      fd.append("title", data.title);
      fd.append("description", data.description);
      fd.append("price", String(data.price));
      fd.append("categoryId", String(data.categoryId));
      fd.append("courseThumbnail", data.courseThumbnail);

      const { data: responseData } = await api.post("/courses/create", fd);
      console.log("Course created successfully:", responseData);

      form.reset({
        title: "",
        description: "",
        price: 0,
        categoryId: 0,
      } as any);
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  }

  // const dispatch = useDispatch();

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const userID = String(getUserDataFromLocal().userId ?? "");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await api.get("categories");
        const data = res.data?.payload ?? res.data;
        if (alive) setCategoryList(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="text-base flex w-full">
      <div className="flex ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title" {...field} />
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
                    <Textarea
                      placeholder="Enter course description"
                      className="resize-none h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryList.map((cat) => (
                        <SelectItem key={cat.categoryId} value={String(cat.categoryId)}>
                          {cat.categoryName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      inputMode="decimal"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseThumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Thumbnail</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) field.onChange(f);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateCourse;
