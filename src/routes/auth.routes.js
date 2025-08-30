import { Router } from "express";
import {registerUser , login, logoutUser, verifyEmail, refreshAccessToken, forgotPasswordRequest, resetForgotPassword, getCurrentUser, changeCurrentPassword, resendEmailVerification} from "../controllers/auth.controller.js";    
import { validate } from "../middlewares/validator.middleware.js";
import { userChangeCurrentPasswordValidator, userForgotPasswordValidator, userLoginValidator , userRegisterValidator, userResetForgotPasswordValidator } from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";



const router = Router();
// unsecured route
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(),login);
router
  .route("/verify-email/:verificationToken")
  .get(verifyEmail);
router
  .route("/refresh-token")
  .post(refreshAccessToken);
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(),validate,forgotPasswordRequest);

router
    .route("/rest-password/:resetToken")
    .post( userResetForgotPasswordValidator(), validate, resetForgotPassword)
// secure Route
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/current-user").post(verifyJWT,getCurrentUser);
router.route("/change-password").post(verifyJWT,userChangeCurrentPasswordValidator(),validate,changeCurrentPassword);
router.route("/recent-email-verification").post(verifyJWT, resendEmailVerification)

export default router;