import { collection, doc, getDocs, query, where } from "firebase/firestore";

export const useCollectionVF = (
    path: string,
    property?: string,
    value?: string
) => {
    const db = useFirestore();
    if (property && value) {
        return useCollection(
            query(collection(db, path), where(property, "==", value))
        );
    }
    return useCollection(collection(db, path));
};

export const getCollectionVF = (
    path: string,
    property?: string,
    value?: string
) => {
    const db = useFirestore();
    if (property && value) {
        const collectionQuery = query(
            collection(db, path),
            where(property, "==", value)
        );

        return getDocs(collectionQuery);
    }
    return getDocs(collection(db, path));
};

// export const useDocVF = (path: string) => {
//   const db = useFirestore();
//   return useDocument(doc(db, path));
// };
