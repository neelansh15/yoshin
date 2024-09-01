<script setup lang="ts">
import { PLAN_LIMITS } from "@/constants";
import type { Project, RoleType } from "@/types";

useHead({
    title: "Projects",
});
definePageMeta({
    middleware: ["auth"],
});

const currentUser = useCurrentUser();
const { currentRole } = useRole();

let userProjects = $ref<Project[]>([]);

// Visible on client side somehow, should be only on the server.
// Update: Probably because this useCollection subscription gives empty row while fetching so doesn't
// stall for SSR since I am not awaiting! If I use the getCollection function it'll probably need the data before loading the page
const { docs, empty } = await getCollectionVF(
    "projects",
    "userId",
    currentUser.value?.uid
);

if (!empty)
    userProjects = docs.map((doc) => ({ id: doc.id, ...doc.data() } as any));

// For checking Limits
let isLimitExceeded = $computed(
    () =>
        !currentRole.value || // Either no role then limit exceeds, or if role is there then check for the limit
        (currentRole.value &&
            userProjects &&
            userProjects.length >=
                PLAN_LIMITS[currentRole.value as RoleType].projects)
);

async function refetch() {
    const { docs, empty } = await getCollectionVF(
        "projects",
        "userId",
        currentUser.value?.uid
    );

    if (!empty)
        userProjects = docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as any)
        );
}
</script>

<template>
    <section
        class="pt-10 pb-24 bg-primary-50 dark:bg-envy-900 text-primary-700 dark:text-white"
    >
        <UContainer>
            <h2 class="text-xl">Welcome</h2>
            <h2 class="font-bold text-3xl">
                {{ currentUser?.displayName || currentUser?.email }}
            </h2>

            <div class="mt-12 lg:mx-40">
                <h1 class="font-bold text-xl">Projects</h1>
            </div>
        </UContainer>
    </section>

    <UContainer>
        <section class="-mt-20 lg:mx-40">
            <UPageGrid>
                <ModalsAddProject
                    :is-limit-exceeded="isLimitExceeded"
                    @project-created="refetch"
                >
                    <UCard
                        class="h-40 grid place-items-center text-primary-800 card-hover dark:bg-envy-700 dark:text-white"
                    >
                        <div class="flex justify-center">
                            <Icon
                                name="i-heroicons-plus-solid"
                                size="20"
                                class="font-bold"
                            />
                        </div>
                        <p class="mt-2 font-semibold">Add Project</p>
                    </UCard>
                </ModalsAddProject>
                <NuxtLink
                    :to="'/projects/' + item.slug"
                    v-for="item in userProjects"
                    :key="item.name"
                >
                    <UCard
                        class="h-40 card-hover flex flex-col justify-between dark:bg-envy-700"
                    >
                        <h2 class="font-bold">
                            {{ item.name }}
                        </h2>
                        <p class="text-sm text-gray-400">{{ item.slug }}</p>
                    </UCard>
                </NuxtLink>
            </UPageGrid>
        </section>
    </UContainer>
</template>
