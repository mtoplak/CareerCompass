import { stringToBlob } from "@/utils/convertImage";
import { resizeImage, resizeImageToDataUrl } from "@/utils/resizeImage";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Functional tests (e2e/) run against the Firebase Auth emulator instead of the real project.
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  connectAuthEmulator(getAuth(app), `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`, {
    disableWarnings: true,
  });
}

export async function registerUser(email: string, password: string) {
  const auth = getAuth(app);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await sendEmailVerification(userCredential.user);
    return userCredential;
  } catch (error) {
    console.error(error);
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


export async function resetPassword(email: string) {
  const auth = getAuth(app);

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    throw new Error(error);
  }
}


export async function uploadImageToStorage(image: any, companyName: FormDataEntryValue): Promise<string> {
  const blob = stringToBlob(image);

  const resizedImage = await resizeImage(blob, 300);

  try {
    const storageRef = ref(storage, `companyLogos/${companyName}_logo.jpg`);
    const uploadTask = uploadBytes(storageRef, resizedImage, {
      contentType: "image/jpeg",
    });
    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    // Firebase Storage rejects uploads (402) since the project is on the Spark plan,
    // so the logo is stored inline in the company document instead.
    console.error("Logo upload to Firebase Storage failed, storing it inline:", error);
    return resizeImageToDataUrl(blob, 300);
  }
}
