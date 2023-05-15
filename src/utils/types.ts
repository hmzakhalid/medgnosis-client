import { z } from "zod";


const patientSchema = z.object({
    Name: z
      .string()
      .min(1, "Name must be at least 1 character long")
      .max(50, "Name must be less than or equal to 50 characters"),
    AGE: z
      .number()
      .min(1, "Age must be at least 1 year old")
      .max(120, "Age must be less than or equal to 120"),
    GENDER: z
      .number()
      .min(1, "Invalid gender value, use 1 for male or 2 for female")
      .max(2, "Invalid gender value, use 1 for male or 2 for female"),
    HEIGHT: z
      .number()
      .min(50, "Height must be at least 50 cm")
      .max(272, "Height must be less than or equal to 272 cm"),
    WEIGHT: z
      .number()
      .min(2, "Weight must be at least 2 kg")
      .max(635, "Weight must be less than or equal to 635 kg"),
    AP_HIGH: z
      .number()
      .min(50, "AP_HIGH must be at least 50")
      .max(300, "AP_HIGH must be less than or equal to 300"),
    AP_LOW: z
      .number()
      .min(30, "AP_LOW must be at least 30")
      .max(200, "AP_LOW must be less than or equal to 200"),
    CHOLESTEROL: z
      .number()
      .min(
        1,
        "Invalid cholesterol value, use 1 for normal, 2 for above normal, or 3 for well above normal"
      )
      .max(
        3,
        "Invalid cholesterol value, use 1 for normal, 2 for above normal, or 3 for well above normal"
      ),
    GLUCOSE: z
      .number()
      .min(
        1,
        "Invalid glucose value, use 1 for normal, 2 for above normal, or 3 for well above normal"
      )
      .max(
        3,
        "Invalid glucose value, use 1 for normal, 2 for above normal, or 3 for well above normal"
      ),
    SMOKE: z.boolean(),
    ALCOHOL: z.boolean(),
    PHYSICAL_ACTIVITY: z.boolean(),
    CARDIO_DISEASE: z.boolean(),
  });

export {
    patientSchema
} 