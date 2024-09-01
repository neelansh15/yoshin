// Only used for the All Projects grid page. Causes flickering redirects to root and back
export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = await getCurrentUser();

  // redirect the user to the login page
  if (!user) {
    return navigateTo({
      path: "/",
      query: {
        redirect: to.fullPath,
      },
    });
  }
});
