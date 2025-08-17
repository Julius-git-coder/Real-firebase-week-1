
// import { create } from 'zustand';
// import { v4 as uuidv4 } from 'uuid';
// import { db } from '@/services/firebaseConfig';
// import { collection,addDoc,deleteDoc,doc,getDocs, updateDoc,query,where } from 'firebase/firestore';



//  const useUsersStore = create((set, get) => ({
//    //initial state
//    users: [
//      //  { name: "John", email: "john@gmail.com", id: uuidv4() },
//      //   { name: "Lois", email: "Lois@gmail.com" , id : uuidv4() },
//      //   { name: "Peter", email: "Peter@gmail.com", id: uuidv4() },
//    ],
//    // Fetching Users from Firestore

//    fetchUsers: async () => {
//      try {
//        // Only get users where isDeleted == false
//        const q = query(
//          collection(db, "users"),
//          where("isDeleted", "==", false)
//        );

//        const snapshot = await getDocs(q);
//        const usersData = snapshot.docs.map((docSnap) => ({
//          id: docSnap.id,
//          ...docSnap.data(),
//        }));

//        // Update Zustand state
//        set({ users: usersData });
//      } catch (error) {
//        console.error("Error fetching users:", error);
//      }
//    },

//    //adding new user
//    addNewUser: async (newUser) => {
//      const docRef = await addDoc(collection(db, "users"), newUser);
//      set({ users: [...get().users, { id: docRef.id, ...newUser }] });
//    },

//    // addNewUser:(newUser)=>
//    //   set((state)=>({
//    //       users:[...state.users,{...newUser,id:uuidv4()}]
//    //   })),

//    //editing user function
//    //user.id === userId → Checks if the current user's ID matches the one you want to edit.
//    // ? newDetails → If it matches, replace that user with the newDetails object (the updated version).
//    // : user → If it doesn't match, keep the existing user unchanged.
//    editUser: (userId, newDetails) =>
//      set((state) => ({
//        users: state.users.map((user) =>
//          user.id === userId ? newDetails : user
//        ),
//      })),

//    //deleting users
//    deleteUser: async (userId) => {
//      try {
//        // Step 1: Soft delete in Firestore
//        await updateDoc(doc(db, "users", userId), {
//          isDeleted: true,
//        });

//        // Step 2: Update local state (remove from UI immediately)
//        set((state) => ({
//          users: state.users.filter((user) => user.id !== userId),
//        }));
//      } catch (error) {
//        console.error("Error hiding user:", error);
//      }
//    },
//  }));


// export default useUsersStore



// // // /src/store/useUsersStore.js
// // import { create } from "zustand";
// // import { v4 as uuidv4 } from "uuid";
// // import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
// // import { app } from "../firebaseConfig"; // your firebase init file

// // const db = getFirestore(app);

// // const useUsersStore = create((set) => ({
// //   // Initial state
// //   users: [],

// //   // Fetch users from Firestore
// //   fetchUsers: async () => {
// //     const querySnapshot = await getDocs(collection(db, "users"));
// //     const usersList = querySnapshot.docs.map((doc) => ({
// //       id: doc.id,
// //       ...doc.data(),
// //     }));
// //     set({ users: usersList });
// //   },

// //   // Add new user to Firestore + local state
// //   addNewUser: async (newUser) => {
// //     const docRef = await addDoc(collection(db, "users"), newUser);
// //     set((state) => ({
// //       users: [...state.users, { ...newUser, id: docRef.id }],
// //     }));
// //   },

// //   // Edit user in Firestore + local state
// //   editUser: async (userId, newDetails) => {
// //     await updateDoc(doc(db, "users", userId), newDetails);
// //     set((state) => ({
// //       users: state.users.map((user) =>
// //         user.id === userId ? { ...user, ...newDetails } : user
// //       ),
// //     }));
// //   },

// //   // Delete user from Firestore + local state
// //   deleteUser: async (userId) => {
// //     await deleteDoc(doc(db, "users", userId));
// //     set((state) => ({
// //       users: state.users.filter((user) => user.id !== userId),
// //     }));
// //   },
// // }));

// // export default useUsersStore;
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { db } from "@/services/firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

const useUsersStore = create((set, get) => ({
  users: [],

  // 🔹 Fetch only non-deleted users
  fetchUsers: async () => {
    try {
      const q = query(collection(db, "users"), where("isDeleted", "==", false));

      const snapshot = await getDocs(q);
      const usersData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      set({ users: usersData });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },

  // 🔹 Add new user (make sure isDeleted = false)
  addNewUser: async (newUser) => {
    try {
      const userWithFlag = { ...newUser, isDeleted: false };
      const docRef = await addDoc(collection(db, "users"), userWithFlag);
      set({ users: [...get().users, { id: docRef.id, ...userWithFlag }] });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  },

  // 🔹 Edit user (both Firestore + local state)
  editUser: async (userId, newDetails) => {
    try {
      await updateDoc(doc(db, "users", userId), newDetails);

      set((state) => ({
        users: state.users.map((user) =>
          user.id === userId ? { ...user, ...newDetails } : user
        ),
      }));
    } catch (error) {
      console.error("Error editing user:", error);
    }
  },

  // 🔹 Soft delete user
  deleteUser: async (userId) => {
    try {
      await updateDoc(doc(db, "users", userId), {
        isDeleted: true,
      });

      set((state) => ({
        users: state.users.filter((user) => user.id !== userId),
      }));
    } catch (error) {
      console.error("Error hiding user:", error);
    }
  },
}));

export default useUsersStore;
