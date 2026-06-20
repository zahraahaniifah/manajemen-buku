const { z } = require("zod");

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const registerSchema = z.object({
name: z.string().min(3, {
        message: "Nama minimal 3 karakter"
    }),

  email: z
    .string()
    .email({
      message: "Format email tidak valid.",
    }),

  password: z
    .string()
    .min(8, {
      message: "Password harus minimal 8 karakter.",
    }),

  role: z
    .enum(["user", "admin"])
    .optional()
    .default("user"),
});

const loginSchemaFull = z.object({
  email: z.string().email({
    message: "Format email tidak valid.",
  }),

  password: z.string().min(1, {
    message: "Password tidak boleh kosong.",
  }),
});

const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1, {
    message: "Password lama tidak boleh kosong.",
  }),

  newPassword: z.string().min(8, {
    message: "Password baru harus minimal 8 karakter.",
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  loginSchemaFull,
  ChangePasswordSchema,
};