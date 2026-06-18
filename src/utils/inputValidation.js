import z from "zod";

const fullNameSchema = z
  .string()
  .min(3, { message: "Full Name must be at least 3 characters long" });
const emailSchema = z.email();
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long." })
  .max(20, { message: "Password cannot exceed 20 characters." })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter.",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least one lowercase letter.",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number." })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character.",
  });

export const userRegisterSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const userLoginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const taskTitleSchema = z
  .string()
  .min(3, { message: "Title must be at least 3 characters long" });

const taskDescriptionSchema = z
  .string()
  .min(10, { message: "Description must be at least 10 characters long" });

const taskStatusSchema = z.enum(["Pending", "In Progress", "Completed"], {
  message: "Please select a valid status",
});

const taskPrioritySchema = z.enum(["High", "Medium", "Low"], {
  message: "Please select a valid priority",
});

const taskEstimatedHoursSchema = z.coerce
  .number()
  .min(1, { message: "Estimated hours must be at least 1" })
  .max(24, { message: "Estimated hours cannot exceed 24 hours" });

const taskDueDateSchema = z.coerce
  .date({ message: "Please enter the valid date" })
  .refine(
    (data) => new Date(data) >= new Date(new Date().setHours(0, 0, 0, 0)),
    { message: "Due Date cannot be in the past" },
  );

const taskRequiredSkillsSchema = z
  .array(z.string())
  .min(1, { message: "Min 1 skill is required" });

export const skillsSchema = z.object({
  skills: z.array(z.string()).min(1, { message: "Min 1 skill is required" }),
});

export const createTaskSchema = z.object({
  title: taskTitleSchema,
  description: taskDescriptionSchema,
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  estimatedHours: taskEstimatedHoursSchema,
  dueDate: taskDueDateSchema,
  requiredSkills: taskRequiredSkillsSchema,
});

export const availableWorkingHoursSchema = z.object({
availableWorkingHours: z.number().min(0, {message:"working hours should be greater than or equal to 0"}).max(24, {message:"working hours should be less than equal to 24"})
})

export const workingDaysSchema = z.object({
  workingDays: z
    .array(
      z.enum([
        "mon",
        "tue",
        "wed",
        "thu",
        "fri"
      ])
    )
    .min(1, "Please select at least one working day"),
});
