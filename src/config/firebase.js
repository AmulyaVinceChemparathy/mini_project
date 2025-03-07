
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAxYseGfHWzDDhynzt8l3PO7tXkcUdklrg",
  authDomain: "signapse-1ede3.firebaseapp.com",
  projectId: "signapse-1ede3",
  storageBucket: "signapse-1ede3.firebasestorage.app",
  messagingSenderId: "573423085155",
  appId: "1:573423085155:web:965553e7c626b94b593a56"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)
const signup=async (username,email,password) => {
  try {
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      username:username.toLowerCase(),
      email,
      name:"",
      avatar:"",
      bio:"Hey, I am using Signapse",
      lastSeen:Date.now()
    })
    await setDoc(doc(db,"chats",user.uid),{
      chatsData:[]
    })
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const login=async (email,password) => {
  try {
    await signInWithEmailAndPassword(auth,email,password)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

const logout=async()=>{
  try {
    await signOut(auth)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
}

export{signup,login,logout,auth,db}