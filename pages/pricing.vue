<script setup lang="ts">
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { BILLING_URL, PLAN_LIMITS } from "~/constants";

/// Metadata
useSeoMeta({
    title: "Pricing",
});

/// Composables
const db = useFirestore();
const currentUser = useCurrentUser();
const toast = useToast();

const { isPro, isBusiness } = useRole();

/// State
let isModalOpen = $ref(false);

/// Functions
async function startCheckout() {
    if (isPro.value || isBusiness.value) {
        navigateTo(BILLING_URL, { external: true, open: { target: "_blank" } });
        return;
    }

    try {
        isModalOpen = true;

        if (!currentUser.value) {
            toast.add({
                title: "Login",
                description: "You need to be logged in to start the trial!",
                color: "amber",
            });
            isModalOpen = false;
            return;
        }

        const docRef = await addDoc(
            collection(
                db,
                "customers",
                currentUser.value.uid,
                "checkout_sessions"
            ),
            {
                price: PLAN_LIMITS.pro.price_id,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
                trial_period_days: 7,
                payment_method_collection: "if_required",
            }
        );

        onSnapshot(docRef, (snap) => {
            const { error, url } = snap.data()!;
            if (error) {
                // Show an error to your customer and
                // inspect your Cloud Function logs in the Firebase console.
                toast.add({
                    color: "red",
                    title: "Error",
                    description: `An error occured: ${error.message}`,
                });
            }

            if (url) {
                // We have a Stripe Checkout URL, let's redirect.
                window.location.assign(url);
            }
        });
    } catch (error) {
        console.error("Error starting checkout", error);
        isModalOpen = false;
        toast.add({
            title: "Error",
            description: "An error occured while starting the checkout",
            color: "red",
        });
    }
}
</script>

<template>
    <section
        class="pt-10 pb-16 bg-primary-50 dark:bg-envy-900 text-primary-700 dark:text-white"
    >
        <UContainer>
            <div class="flex items-center justify-between">
                <h2 class="font-bold text-4xl">Pricing</h2>
            </div>
            <p
                v-if="!currentUser || (isPro === false && isBusiness === false)"
                class="mt-3"
            >
                Start a 7-Day free trial, no credit card required!
            </p>
        </UContainer>
    </section>

    <UContainer>
        <div class="mt-10">
            <div
                class="mx-auto space-y-5 lg:space-y-0 lg:flex justify-center gap-5"
            >
                <UPricingCard
                    title="Pro"
                    description="Yoshin's Pro plan gives you access to multiple tools to aid your NFT's Data and Rewards"
                    price="$29"
                    discount=""
                    cycle="/month"
                    :highlight="true"
                    :button="{
                        label: isPro
                            ? 'Manage Subscription'
                            : 'Start Free Trial',
                        click: startCheckout,
                    }"
                    orientation="vertical"
                    align="bottom"
                    :features="[
                        PLAN_LIMITS.pro.projects + ' Projects',
                        PLAN_LIMITS.pro.timers + ' Timers',
                        PLAN_LIMITS.pro.runs + ' Timer Runs',
                        'Unlimited Distribution Plans',
                    ]"
                    class="max-w-md dark:bg-envy-950"
                />
                <UPricingCard
                    title="Business"
                    description="Turn your NFTs into a business with more freedom and flexibility"
                    price="$99"
                    discount=""
                    cycle="/month"
                    :highlight="false"
                    :button="{
                        label: isBusiness ? 'Manage Subscription' : 'Buy Now',
                    }"
                    orientation="vertical"
                    align="bottom"
                    :features="[
                        PLAN_LIMITS.business.projects + ' Projects',
                        PLAN_LIMITS.business.timers + ' Timers',
                        PLAN_LIMITS.business.runs + ' Timer Runs',
                        'Unlimited Distribution Plans',
                    ]"
                    class="max-w-md dark:bg-envy-950"
                />
            </div>
        </div>
    </UContainer>

    <UModal v-model="isModalOpen" prevent-close class="max-w-xs">
        <UCard>
            <div class="grid place-items-center">
                <h3 class="mt-5 text-primary-800">Redirecting to checkout...</h3>
            </div>
        </UCard>
    </UModal>
</template>
