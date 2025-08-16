
import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/services/firebaseConfig';
import { collection,addDoc,deleteDoc,doc,getDocs, updateDoc } from 'firebase/firestore';



 const useUsersStore= create((set,get)=>({
    //initial state
   users:[
      //  { name: "John", email: "john@gmail.com", id: uuidv4() },
      //   { name: "Lois", email: "Lois@gmail.com" , id : uuidv4() },
      //   { name: "Peter", email: "Peter@gmail.com", id: uuidv4() },
   ],
// Fetching Users from Firestore
   fetchUsers: async ()=>{
    const snapshot = await getDocs(collection(db,'users'))
    const usersData = snapshot.docs.map((docSnap)=>({

      id:docSnap.id, ...docSnap.data()
    }));

    set({users:usersData})
   },





//adding new user
   addNewUser:async (newUser)=> {
    const docRef = await addDoc(collection(db,'users'),newUser)
    set({users:[...get().users,{id:docRef.id, ...newUser}]})


   },
    
   

    // addNewUser:(newUser)=>
    //   set((state)=>({
    //       users:[...state.users,{...newUser,id:uuidv4()}]
    //   })),




//editing user function
//user.id === userId → Checks if the current user's ID matches the one you want to edit.
// ? newDetails → If it matches, replace that user with the newDetails object (the updated version).
// : user → If it doesn't match, keep the existing user unchanged.
editUser: (userId,newDetails)=>
    set((state)=>({
       users: state.users.map((user) =>
        user.id === userId ? newDetails : user
      ),
    })),

//deleting users
deleteUser: (userId) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== userId),
    })),


}))


export default useUsersStore



// // /src/store/useUsersStore.js
// import { create } from "zustand";
// import { v4 as uuidv4 } from "uuid";
// import { getFirestore, collection, addDoc, doc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
// import { app } from "../firebaseConfig"; // your firebase init file

// const db = getFirestore(app);

// const useUsersStore = create((set) => ({
//   // Initial state
//   users: [],

//   // Fetch users from Firestore
//   fetchUsers: async () => {
//     const querySnapshot = await getDocs(collection(db, "users"));
//     const usersList = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     set({ users: usersList });
//   },

//   // Add new user to Firestore + local state
//   addNewUser: async (newUser) => {
//     const docRef = await addDoc(collection(db, "users"), newUser);
//     set((state) => ({
//       users: [...state.users, { ...newUser, id: docRef.id }],
//     }));
//   },

//   // Edit user in Firestore + local state
//   editUser: async (userId, newDetails) => {
//     await updateDoc(doc(db, "users", userId), newDetails);
//     set((state) => ({
//       users: state.users.map((user) =>
//         user.id === userId ? { ...user, ...newDetails } : user
//       ),
//     }));
//   },

//   // Delete user from Firestore + local state
//   deleteUser: async (userId) => {
//     await deleteDoc(doc(db, "users", userId));
//     set((state) => ({
//       users: state.users.filter((user) => user.id !== userId),
//     }));
//   },
// }));

// export default useUsersStore;
