import { 
    getDatabase, 
    ref,
    get,
    update,
    push,
    child
} from 'firebase/database'
import { getAuth } from 'firebase/auth'
import app from './firebase'

const writeUserData = (email) => {
    const auth = getAuth(app)
    const user = auth.currentUser
    if (user !== null) {
        const db = getDatabase(app);
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
        const db = getDatabase(app);
        const uid = user.uid
        const newRestaurantKey = push(child(ref(db), 'user-restaurants/' + uid + '/' + list)).key
        const updates = {}
        updates['user-restaurants/' + uid + '/' + list + '/' + newRestaurantKey] = restaurant
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

export { writeUserData, addToList, readFromList }

// const distanceRef = ref(db, 'users/' + userID + '/distance')
// onValue(distanceRef, (snapshot) => {
//   const data = snapshot.val()
//   updateDistance(postElement, data)
// })


// const commentsRef = ref(db, 'post-comments/' + postID)
// onValue(commentsRef, (snapshot) => {
//   snapshot.forEach((childSnapshot) => {
//     const childKey = childSnapshot.key
//     const childData = childSnapshot.val()
//   })
// })

// onChildAdded(commentsRef, (data) => {
//    addCommentElement(postElement, data.key, data.val().text, data.val().author)
// })

// onChildChanged(commentsRef, (data) => {
//    setCommentValues(postElement, data.key, data.val().text, data.val().author)
// })


// onChildRemoved(commentsRef, (data) => {
//    deleteComment(postElement, data.key, data.val().text, data.val().author)
// })