import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("routes/auth/authLayout.tsx", [
        index("routes/root/home.tsx"),
        route('/sign-up', "routes/auth/signUp.tsx"),
        route('/login', "routes/auth/login.tsx"),
        route('/forget-password', "routes/auth/forgetPassword.tsx"),
        route('/reset-password', "routes/auth/resetPassword.tsx"),
        route('/verify-email', "routes/auth/verifyEmail.tsx")

    ]),
    layout("routes/dashboard/dashboardLayout.tsx", [
        route('/dashboard', "routes/dashboard/index.tsx"),
        route('/workspaces', "routes/dashboard/workspace/index.tsx"),
        route('/workspaces/:workspaceId', "routes/dashboard/workspace/workspaceDetails.tsx")
    ])
] satisfies RouteConfig;
