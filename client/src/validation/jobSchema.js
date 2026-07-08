import { z } from "zod";

export const jobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Job title must be at least 3 characters"),

  company: z
    .string()
    .trim()
    .min(2, "Company name is required"),

  location: z
    .string()
    .trim()
    .min(2, "Location is required"),

  salary: z
    .coerce
    .number()
    .min(1, "Salary is required"),

  employmentType: z.enum([
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
  ]),

  experience: z
    .string()
    .trim()
    .min(1, "Experience is required"),

  description: z
    .string()
    .trim()
    .min(20, "Description should be at least 20 characters"),

  requirements: z
    .string()
    .trim()
    .min(5, "Enter at least one requirement"),
});