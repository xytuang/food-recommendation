import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyARCWJiFhLkcIuc08vphXXH1DTSS9Gx6Bg",
  authDomain: "food-recommendation-13e3f.firebaseapp.com",
  databaseURL: "https://food-recommendation-13e3f-default-rtdb.firebaseio.com",
  projectId: "food-recommendation-13e3f",
  storageBucket: "food-recommendation-13e3f.appspot.com",
  messagingSenderId: "321803912117",
  appId: "1:321803912117:web:698b42546ec9086e50cffc",
  measurementId: "G-YSEMWQJH6Q"
};

const app = initializeApp(firebaseConfig)

export default app

