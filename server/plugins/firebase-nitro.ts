import { applicationDefault, initializeApp } from "firebase-admin/app";

export default defineNitroPlugin(() => {
  initializeApp({
    credential: applicationDefault(),
  });
});
