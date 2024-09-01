import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export function useSignIn() {
    const toast = useToast();
    const auth = useFirebaseAuth();

    function signIn() {
        if (!auth) return;
        signInWithPopup(auth, new GoogleAuthProvider()).catch((e) => {
            console.error(e);
            toast.add({
                title: "Error",
                description: getErrorMessage(e),
                color: "red",
            });
        });
    }

    return {
        signIn,
    };
}
