/** @type {import('next').NextConfig} */
const env = {
  FOODIE_MONGO_DB_NAME: "food-planner",
  FOODIE_MONGO_USERS: "users",
  FOODIE_WEEKLY_LIST: "weekly_list",
  FOODIE_FULL_MENU: "full_menu",
  FOODIE_INGREDIENTS: "ingredients",
  FOODIE_USERS: "users",

  FOODIE_URI:
    "mongodb+srv://MerK_Admin:Lithiumx1!@cluster0.vqzf4.mongodb.net/?retryWrites=true&w=majority",
  FOODIE_SIGNUP_URI:
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtXfRUu1k6DRTfPSGmhFZhVIaf6q233Nc",
  FOODIE_LOGIN_URI:
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtXfRUu1k6DRTfPSGmhFZhVIaf6q233Nc",
  FIREBASE_API_KEY: "AIzaSyAIUO6XcQ5NIHX2qRSFKbtVOkxYQ0GL1Rc",
  RETURN_TYPE: "send",
};

const nextConfig = {
  reactStrictMode: true,
  env: env,
};

module.exports = nextConfig;
