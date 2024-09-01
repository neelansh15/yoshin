import type { RoleType } from "@/types";

export function useRole() {
  const currentUser = useCurrentUser();

  let isPro = $ref<boolean | undefined>();
  let isBusiness = $ref<boolean | undefined>();

  let currentRole = $ref<RoleType | undefined>();

  watch(
    currentUser,
    async () => {
      // Get custom claim for user
      if (currentUser.value) {
        // NOTE: instead of firebase Stripe extension,
        // use Coinbase Commerce or other crypto solution

        // Force refresh token
        await currentUser.value.getIdToken(true);
        const decodedToken = await currentUser.value.getIdTokenResult();

        isPro = decodedToken.claims.stripeRole === "pro";
        isBusiness = decodedToken.claims.stripeRole === "business";
        currentRole = decodedToken.claims.stripeRole as RoleType;
      }
    },
    { immediate: true }
  );

  // Note: Remember that it returns a normal ref, so have to use .value when using it
  return $$({
    isPro,
    isBusiness,
    currentRole,
  });
}
