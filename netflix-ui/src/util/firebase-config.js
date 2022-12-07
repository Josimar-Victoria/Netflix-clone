// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCgMjQJy-ZV2d-AKkeDCTip51gRuxaMnno',
  authDomain: 'react-netflix-clone-fd1ed.firebaseapp.com',
  projectId: 'react-netflix-clone-fd1ed',
  storageBucket: 'react-netflix-clone-fd1ed.appspot.com',
  messagingSenderId: '92457295547',
  appId: '1:92457295547:web:0a35f3bf8dd046bf03539e',
  measurementId: 'G-210GK9Y6P3'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
