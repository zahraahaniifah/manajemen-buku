const authService = require("../services/authServices");
const {
  registerSchema,
  loginSchemaFull,
  ChangePasswordSchema,
  refreshToken,
} = require("../validations/authValidation");

const authController = {
  async register(req, res) {
    console.log("REGISTER REQUEST", req.method, req.path, req.body);
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validasi gagal",
        errors: validation.error.errors,
      });
    }

    try {
      const user = await authService.register(validation.data);

      return res.status(201).json({
        message: "Registrasi berhasil",
        data: user,
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error);

      if (error.message === "EMAIL_ALREADY_EXISTS") {
        return res.status(409).json({
          message: "Email sudah terdaftar",
        });
      }

      if (error.message === "FORBIDDEN_ROLE") {
        return res.status(403).json({
          message: "Tidak diizinkan membuat akun ADMIN",
        });
      }

      return res.status(500).json({
        message: error.message,
      });
    }
  },

  async login(req, res) {
    const validation = loginSchemaFull.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validasi gagal",
        errors: validation.error.errors,
      });
    }

    try {
      const tokens = await authService.login(validation.data);

      return res.status(200).json({
        message: "Login berhasil",
        ...tokens,
      });
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      if (error.message === "INVALID_CREDENTIALS") {
        return res.status(401).json({
          message: "Email atau password salah",
        });
      }

      return res.status(500).json({
        message: error.message,
      });
    }
  },

  async changePassword(req, res) {
    const validation = ChangePasswordSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        message: "Validasi gagal",
        errors: validation.error.errors,
      });
    }

    try {
      const result = await authService.changePassword({
        userId: req.user.userId,
        ...validation.data,
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error("CHANGE PASSWORD ERROR:", error);

      if (error.message === "INVALID_OLD_PASSWORD") {
        return res.status(401).json({
          message: "Password lama tidak sesuai",
        });
      }

      return res.status(500).json({
        message: error.message,
      });
    }
  },
 
  async refreshToken(req, res) {
    try {
        const { refreshToken } = req.body;

        const token = await authService.refreshToken(refreshToken);

        return res.status(200).json(token);

    } catch (error) {

        if (
            error.message === "REFRESH_TOKEN_REQUIRED" ||
            error.message === "INVALID_REFRESH_TOKEN"
        ) {
            return res.status(401).json({
                message: "Refresh token tidak valid"
            });
        }

        return res.status(500).json({
            message: "Terjadi kesalahan pada server"
        });
    }
},

};



module.exports = authController;
