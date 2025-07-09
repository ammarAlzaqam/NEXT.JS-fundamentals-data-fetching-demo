import z from "zod";

export const createProductSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title must not exceed 100 characters" }),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be a positive number" }),

  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" })
    .max(1000, { message: "Description must not exceed 1000 characters" }),
});
