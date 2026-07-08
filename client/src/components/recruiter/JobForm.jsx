
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input";
import Button from "../ui/Button";

import { jobSchema } from "../../validation/jobSchema";

function JobForm({
  initialValues = null,
  onSubmit,
  loading = false,
  submitText = "Create Job",
}) {
    
  const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: zodResolver(jobSchema),
  defaultValues: {
    title: initialValues?.title || "",
    company: initialValues?.company || "",
    location: initialValues?.location || "",
    salary: initialValues?.salary || "",
    employmentType:
      initialValues?.employmentType || "Full-Time",
    experience:
      initialValues?.experience || "Fresher",
    description:
      initialValues?.description || "",
    requirements:
      initialValues?.requirements?.join("\n") || "",
  },
});


  const submitHandler = (data) => {
    onSubmit({
      ...data,

      salary: Number(data.salary),

      requirements: data.requirements
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6 rounded-xl border bg-white p-8 shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Title */}

        <div>
          <label className="mb-2 block font-medium">
            Job Title
          </label>

          <Input
            placeholder="Frontend Developer"
            {...register("title")}
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Company */}

        <div>
          <label className="mb-2 block font-medium">
            Company
          </label>

          <Input
            placeholder="Google"
            {...register("company")}
          />

          {errors.company && (
            <p className="mt-1 text-sm text-red-500">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Location */}

        <div>
          <label className="mb-2 block font-medium">
            Location
          </label>

          <Input
            placeholder="Bangalore"
            {...register("location")}
          />

          {errors.location && (
            <p className="mt-1 text-sm text-red-500">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Salary */}

        <div>
          <label className="mb-2 block font-medium">
            Salary
          </label>

          <Input
            type="number"
            placeholder="1200000"
            {...register("salary")}
          />

          {errors.salary && (
            <p className="mt-1 text-sm text-red-500">
              {errors.salary.message}
            </p>
          )}
        </div>

        {/* Employment */}

        <div>
          <label className="mb-2 block font-medium">
            Employment Type
          </label>

          <select
            {...register("employmentType")}
            className="w-full rounded-md border border-slate-300 px-4 py-2.5 focus:border-blue-600 focus:outline-none"
          >
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Experience */}

        <div>
          <label className="mb-2 block font-medium">
            Experience
          </label>

          <Input
            placeholder="0-2 Years"
            {...register("experience")}
          />

          {errors.experience && (
            <p className="mt-1 text-sm text-red-500">
              {errors.experience.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={6}
          {...register("description")}
          className="w-full rounded-md border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Requirements */}

      <div>
        <label className="mb-2 block font-medium">
          Requirements
        </label>

        <textarea
          rows={6}
          placeholder="One requirement per line"
          {...register("requirements")}
          className="w-full rounded-md border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none"
        />

        {errors.requirements && (
          <p className="mt-1 text-sm text-red-500">
            {errors.requirements.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
      >
        {loading ? "Saving..." : submitText}
      </Button>
    </form>
  );
}

export default JobForm;