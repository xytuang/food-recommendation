import { 
    getDatabase, 
    ref,
    get,
    update,
    remove,
    child
} from 'firebase/database'
import { getAuth } from 'firebase/auth'
import app from './firebase'

const writeUserData = (email) => {
    const auth = getAuth(app)
    const user = auth.currentUser
    if (user !== null) {
        const db = getDatabase(app)
        const uid = user.uid
        const userData = {
            uid: uid,
            email: email,
        }
        const usersRef = ref(db, 'users/' + uid)
        return update(usersRef, userData)
    }
}

const addToList = (restaurant, list) => {
    const auth = getAuth(app)
    const user = auth.currentUser
    if (user !== null) {
        const db = getDatabase(app)
        const uid = user.uid
        const updates = {}
        updates['user-restaurants/' + uid + '/' + list + '/' + restaurant._id] = restaurant
        return update(ref(db), updates)
    }
}

const readFromList = (list) => {
    const auth = getAuth(app)
    const user = auth.currentUser
    if (user !== null) {
        const dbRef = ref(getDatabase(app));
        const uid = user.uid
        return get(child(dbRef, 'user-restaurants/' + uid + '/' + list)).then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val()
            }
        }).catch((error) => {
            return null
        })
    }
}

const deleteFromList = (id, list) => {
    const auth = getAuth(app)
    const user = auth.currentUser
    if (user !== null) {
        const db = getDatabase(app)
        const uid = user.uid
        const restaurantRef = ref(db, 'user-restaurants/' + uid + '/' + list + '/' + id)
        return remove(restaurantRef)
    }
}

export { writeUserData, addToList, readFromList, deleteFromList }