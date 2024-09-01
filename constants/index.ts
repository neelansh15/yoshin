/// Variables

// Cloud functions Region
export const REGION = "asia-south1";
export const BILLING_URL =
  "https://billing.stripe.com/p/login/test_eVa3dE3Tm8RW4w0bII";
/// Constants

/**
 * Plan Limits per Month of Billing Cycle. For testing purposes, the limits are set to a very low number.
 * TODO: Move away from Stripe
 */
export const PLAN_LIMITS = {
  pro: {
    projects: 2,
    timers: 6,
    runs: 100,
    price_id: "price_1OkhW1SEbzPMW5rIgUCyKVWz", // Stripe Price ID for Yoshin Pro
    trial_period_days: 7,
  },
  business: {
    projects: 5,
    timers: 25,
    runs: 500,
    price_id: "price_1OsjAoSEbzPMW5rIJSI4cHSf", // Stripe Price ID for Yoshin Business
  },
};
