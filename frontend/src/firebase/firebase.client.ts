import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendSignInLinkToEmail, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export async function registerUser(email: string, password: string) {
  const auth = getAuth(app);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await sendSignInLinkToEmail(auth, email, { url: "https://career-compass-front.vercel.app/prijava", handleCodeInApp: true });
    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
  }
}


export async function signInUser(email: string, password: string) {
  const auth = getAuth(app);

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error: any) {
    throw new Error(error);
  }
}
