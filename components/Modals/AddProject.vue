<script setup lang="ts">
import { getApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import slug from "slug";
import { REGION } from "@/constants";
import type { Project } from "@/types";

const props = defineProps<{
    isLimitExceeded: boolean;
}>();

const emit = defineEmits(["projectCreated"]);

const toast = useToast();
const currentUser = useCurrentUser();
const { isPro, isBusiness } = useRole();
const colorMode = useColorMode();

const value = $ref("");
let isOpen = $ref(false);
let isLimitModalOpen = $ref(false);
let loading = $ref(false);

/// Functions
async function addProject() {
    if (value === "" || !currentUser.value?.uid || props.isLimitExceeded)
        return;

    try {
        loading = true;

        // const db = useFirestore();
        // const projects = collection(db, "projects");

        // Omit because id is not added in the database but returned from useProject always
        const newProject: Omit<Project, "id"> = {
            name: value,
            slug: slug(value),
            userId: currentUser.value.uid,
            createdAt: new Date().getTime(),
        };

        // await addDoc(projects, newProject);

        // Add Project using the Firebase Function
        const functions = getFunctions(getApp(), REGION);
        const createProject = httpsCallable(functions, "createProject");

        await createProject(newProject);

        toast.add({
            title: "Created Project!",
            description: 'Project "' + value + '" has been created',
        });

        emit("projectCreated");

        isOpen = false;
        loading = false;
    } catch (e) {
        console.error(e);
        toast.add({
            color: "red",
            title: "Error",
            description: getErrorMessage(e),
        });
        isOpen = false;
        loading = false;
    }
}
</script>

<template>
    <!-- Default slot is the trigger -->
    <div
        @click="
            () => {
                if (isLimitExceeded) isLimitModalOpen = true;
                else isOpen = true;
            }
        "
    >
        <slot></slot>
    </div>

    <UModal v-model="isOpen" :class="colorMode.preference">
        <UCard class="dark:bg-envy-800 dark:text-white">
            <template #header>
                <h1 class="font-semibold">Add Project</h1>
            </template>

            <UFormGroup
                label="Project Name"
                description="Maximum 255 characters"
            >
                <UInput
                    type="text"
                    maxlength="255"
                    v-model="value"
                    color="gray"
                    placeholder="Name"
                    name="name"
                    class="mt-3"
                />
            </UFormGroup>

            <template #footer>
                <div class="flex justify-end">
                    <UButton
                        leading-icon="i-heroicons-check"
                        @click="addProject"
                        :loading="loading"
                        >Create</UButton
                    >
                </div>
            </template>
        </UCard>
    </UModal>

    <UModal v-model="isLimitModalOpen">
        <UCard>
            <template #header>
                <h1 class="font-semibold">
                    {{
                        isPro === false && isBusiness === false
                            ? "Subscribe to create projects"
                            : "Maximum Projects Created"
                    }}
                </h1>
            </template>

            <p>
                You have reached the maximum number of projects you can create.
                {{
                    isPro
                        ? "Upgrade to Business to create more projects."
                        : isBusiness
                        ? "Contact us to increase your limits with your current plan"
                        : "Subscribe to a plan to create projects"
                }}
            </p>

            <template #footer>
                <div class="flex justify-end">
                    <UButton
                        v-if="isPro"
                        leading-icon="i-heroicons-arrow-up"
                        color="purple"
                        @click="navigateTo('/pricing')"
                        >Upgrade to Business</UButton
                    >
                    <UButton
                        v-else-if="isBusiness"
                        leading-icon="i-heroicons-phone"
                    >
                        Contact us
                    </UButton>
                    <UButton
                        v-else
                        color="purple"
                        leading-icon="i-heroicons-arrow-up"
                        @click="navigateTo('/pricing')"
                        >See available plans</UButton
                    >
                </div>
            </template>
        </UCard>
    </UModal>
</template>
