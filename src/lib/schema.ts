import z from "zod";
import axios from "axios";

export const registeSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, { message: "Maksimal 50 karakter" })
    .regex(/^[A-Za-z '.]+$/),
  email: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, { message: "Maksimal 50 karakter" })
    .email("Email tidak valid")
    .refine(async (e) => {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${e}`);
      if (data.data !== null) {
        const validateEmail = data.data.email;
        return validateEmail.includes(!e);
      } else {
        return e === e;
      }
    }, "Email telah digunakan"),
  password: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
  phoneNumber: z
    .string()
    .min(9, { message: "Minimal 9 karakter" })
    .max(13, { message: "Maksimal 13 karakter" })
    .regex(/^[0-9'.]+$/, { message: "Hanya angka 0-9" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, { message: "Maksimal 50 karakter" })
    .email("Email tidak valid"),
  password: z.string().min(3, { message: "Minimal 3 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
  phoneNumber: z
    .string()
    .min(9, { message: "Minimal 9 karakter" })
    .max(13, { message: "Maksimal 13 karakter" })
    .regex(/^[0-9'.]+$/, { message: "Hanya angka 0-9" }),
});
