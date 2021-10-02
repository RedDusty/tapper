import { userInfoType } from './redux/types';
import { GoogleAuthProvider, signInWithRedirect, User } from 'firebase/auth';
import { getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, firestore } from './fbConfig';

export const signInWithGoogle = () => {
  signInWithRedirect(auth, new GoogleAuthProvider())
    .then(() => console.log('Log in with Google'))
    .catch((e) => console.log('Error when log in with Google'));
};

export const logOut = () => {
  auth
    .signOut()
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

function generateAccessKey() {
  const arr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-=!@#$%^&*()_+';

  let code = '';

  for (let i = 0; i < 36; i++) {
    const random = Math.floor(Math.random() * arr.length);
    code += arr[random];
  }

  return code;
}

export async function fbGetUser(gUser: User) {
  const docRef = doc(firestore, 'users', gUser.uid);

  const userDoc = await getDoc(docRef);

  if (userDoc.exists()) {
    const userData = await userDoc.data();

    await updateDoc(docRef, {
      avatar: gUser.photoURL,
      nickname: gUser.displayName,
      uid: gUser.uid
    } as userInfoType);

    return userData;
  } else {
    const docData = {
      avatar: gUser.photoURL,
      banned: false,
      firstLogin: new Date().getTime(),
      nickname: gUser.displayName,
      score: 0,
      skin: 'standard',
      key: generateAccessKey(),
      uid: gUser.uid
    };
    await setDoc(doc(firestore, 'users', gUser.uid), docData);

    return docData;
  }
}
