import z from "zod";
import axios from "axios";

const MAX_FILE_SIZE = 1000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"];

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
    .email("Email tidak valid"),
  // .refine(async (e) => {
  //   const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${e}`);
  //   if (data.data !== null) {
  //     const validateEmail = data.data.email;
  //     return validateEmail.includes(!e);
  //   } else {
  //     return e === e;
  //   }
  // }, "Email telah digunakan"),
  password: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
  phoneNumber: z
    .string()
    .min(9, { message: "Minimal 9 karakter" })
    .max(13, { message: "Maksimal 13 karakter" })
    .regex(/^[0-9'.]+$/, { message: "Hanya angka 0-9" }),
});

export const loginSchema = z.object({
  emailOrPhoneNumber: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, { message: "Maksimal 50 karakter" })
    .regex(/^[A-Za-z0-9@'.]+$/),
  // .refine(async (e) => {
  //   const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/${e}`);
  //   if (data.data !== null) {
  //     const validateEmail = data.data.email;
  //     return validateEmail.includes(e);
  //   } else {
  //     return;
  //   }
  // }, "Email atau nomor telepon tidak sesuai"),
  password: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
});

export const uploadImageSchema = z.object({
  file: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Ukuran gambar masksimal 1MB.`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type), "Hanya format .jpg, .jpeg, .png"),
});

export const formPropertySchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Minimal 2 karakter",
    })
    .max(25, { message: "Maksimum 25 karakter" }),
  description: z
    .string()
    .min(2, {
      message: " Minimal 2 karakter",
    })
    .max(50, { message: "Maksimum 25 karakter" }),
  categoryId: z.string(),
  // image_url: z.string().min(2, {
  //   message: " Minimal 2 karakter",
  // }).max(255,{message: "Maksimum 255 karakter"}),
  file: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Ukuran gambar masksimal 1MB.`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type), "Hanya format .jpg, .jpeg, .png"),
  location: z.string({ required_error: "Lokasi harus diisi" }),
});

export const formRoomSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Minimal 2 karakter",
    })
    .max(25, { message: "Maksimum 25 karakter" }),
  price: z.number({ required_error: "Harga sewa harus diisi" }).nonnegative(),
  description: z
    .string()
    .min(2, {
      message: " Minimal 2 karakter",
    })
    .max(50, { message: "Maksimum 50 karakter" }),
  guest: z.number({ required_error: "Jumlah orang harus diisi" }).nonnegative(),
  file: z
    .any()
    .refine((files) => files?.size <= MAX_FILE_SIZE, `Ukuran gambar masksimal 1MB.`)
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.type), "Hanya format .jpg, .jpeg, .png"),
  room_info: z
    .string()
    .min(2, {
      message: "Minimal 2 karakter",
    })
    .max(200, { message: "Maksimum 200 karakter" }),
});

// export const specialPriceSchema = z.object({
//   percentage: z.number({required_error :"Persen harus diisi"}).min(0).max(100).optional(),
//   price:z.number({required_error :"Harga penyesuaian harus diisi"}).optional(),
//   date: z.date().refine((date) => date !== undefined, 'Date is required'),
// });

const SpecialPriceSchema = z
  .object({
    percentage: z.number().min(0).max(100).optional(),
    price: z.number().optional(),
    date: z.date(),
  })
  .refine((data) => {
    console.log(data);
    // Validate that either percentage or price is provided, but not both
    if (!((data.percentage !== 0 && data.price === 0) || (data.percentage === 0 && data.price !== 0))) {
      throw new Error("Either percentage or price should be provided, but not both.");
    }
    return true;
  }, "Either percentage or price should be provided, but not both.");

export const specialPriceSchema = SpecialPriceSchema;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
    newPassword: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
    confirmPassword: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: "Password harus berbeda",
    path: ["newPassword"],
  });

export const updateUserSchema = z.object({
  name: z.string().min(4, "Please enter a valid value").optional().or(z.literal("")),
  address: z.string().min(4, "Please enter a valid value").optional().or(z.literal("")),
  birthdate: z.string().min(4, "Please enter a valid value").optional().or(z.literal("")),
  gender: z.string().min(4, "Please enter a valid value").optional().or(z.literal("")),
  password: z
    .string()
    .min(6, { message: "Minimal 6 karakter" })
    .max(16, { message: "Maksimal 16 karakter" })
    .optional()
    .or(z.literal("")),
  phoneNumber: z
    .string()
    .min(9, { message: "Minimal 9 karakter" })
    .max(13, { message: "Maksimal 13 karakter" })
    .optional()
    .or(z.literal("")),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
    confirmPassword: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  });

export const nameSchema = z.object({
  name: z.string().min(3),
});

export const emailSchema = z.object({
  email: z.string().email().min(3),
});

export const changeEmailSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, { message: "Maksimal 50 karakter" })
    .email("Email tidak valid")
    .refine(async (e) => {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/email/${e}`);
      if (data && data.data) {
        const validateEmail = data.data.email;
        return validateEmail.includes(!e);
      } else {
        return e === e;
      }
    }, "Email tidak tersedia"),
  password: z.string().min(6, { message: "Minimal 6 karakter" }).max(16, { message: "Maksimal 16 karakter" }),
});

export const editEmailSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Minimal 3 karakter" })
    .max(50, { message: "Maksimal 50 karakter" })
    .email("Email tidak valid")
    .refine(async (e) => {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/user/email/${e}`);
      if (data && data.data) {
        const validateEmail = data.data.email;
        return validateEmail.includes(!e);
      } else {
        return e === e;
      }
    }, "Email tidak tersedia"),
});

export const genderSchema = z.object({
  gender: z.enum(["male", "female"]),
});

export const birthdateSchema = z.object({
  birthdate: z.number(),
});

export const searchSchema = z.object({
  location: z.string(),
});
