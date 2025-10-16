# TODO List for Forget Password Feature (OTP-based)

## Backend Changes
- [x] Update User model to include otp and otpExpires fields
- [x] Install nodemailer dependency
- [x] Create emailService.js for sending OTP emails
- [x] Add forgotPassword and resetPassword functions to authController.js (OTP-based)
- [x] Update authRoutes.js to include new routes for forgot-password and reset-password
- [x] Update authService.js to include forgotPassword and resetPassword methods (OTP-based)

## Frontend Changes
- [x] Update Login.jsx to include forget password functionality
- [x] Add state variables for forgot password form (email, otp, newPassword)
- [x] Add handlers for forgot password and reset password
- [x] Add UI for forgot password form below login form (email, send OTP, OTP input, new password)
- [x] Remove URL parameter handling (not needed for OTP)

## Testing
- [ ] Test forgot password flow (send OTP)
- [ ] Test reset password flow (verify OTP and reset)
- [ ] Test email sending (requires email configuration)
- [ ] Test error handling

## Configuration
- [ ] Set up environment variables for email (EMAIL_USER, EMAIL_PASS)
