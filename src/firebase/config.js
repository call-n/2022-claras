import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCfRB5HbBlHyBW_LlYs0N3AUnqL27NLvOc",
    authDomain: "claras-a0ff0.firebaseapp.com",
    projectId: "claras-a0ff0",
    storageBucket: "claras-a0ff0.appspot.com",
    messagingSenderId: "587180652997",
    appId: "1:587180652997:web:afa31f8032a48872dd73ac"
}

// init firebase
const app = initializeApp(firebaseConfig)

// init services
const db = getFirestore(app)
const Auth = getAuth()

export { db, Auth }