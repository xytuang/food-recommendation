import { writeUserData } from './database'
import app from './firebase'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'

export const auth = getAuth(app)

const register = async (email, password) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        writeUserData(email)
    } catch (error) {
        console.log(error)
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error)
    }
}

export { register, login, logout }
