/** @type {import('next').NextConfig} */
const env = {
  SORS_FIREBASE_SIGNUP_URI:
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZZ-qS7sCKXiwUyKrrxsH40zhIQWU8YBI",
  SORS_FIREBASE_LOGIN_URI:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZZ-qS7sCKXiwUyKrrxsH40zhIQWU8YBI",
  SORS_MONGO_URI:
    "mongodb+srv://sorsAdmin:sorsAdmin@sors.a9hli.mongodb.net/?retryWrites=true&w=majority",
  MerK_MONGO_URI:
    "mongodb+srv://MerK_Admin:Lithiumx1!@cluster0.vqzf4.mongodb.net/?retryWrites=true&w=majority",
};

const nextConfig = {
  reactStrictMode: true,
  env: env,
};

module.exports = nextConfig;
