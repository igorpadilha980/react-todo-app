import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase'

function taskCollection(userId) {
    return collection(firestore, 'users', userId, 'tasks')
}

function docToTask(document) {
    const data = document.data()

    return {
        id: document.id,
        title: data.title,
        description: data.description,
        completed: data.completed
    }
}

async function allTasks(userId) {
    const search = query(taskCollection(userId));

    return getDocs(search)
            .then(snapshot => snapshot.docs)
            .then(docs => {
                return docs.map(docToTask)
            })
}

async function createTask(userId, taskData) {
    const newTask = { ...taskData, completed: false }
    console.log("creating task: ", newTask)

    return addDoc(taskCollection(userId), newTask)
        .then(docRef => docRef.id)
        .then(id => {
            newTask.id = id
            return newTask
        })
}

async function updateTaskStatus(userId, taskId, newStatus) {
    console.log(`updating task ${taskId}, status: ${newStatus}`)

    const taskRef = doc(firestore, taskCollection(userId).path, taskId)
    return updateDoc(taskRef, { completed: newStatus })
}

async function deleteTask(userId, taskId) {
    console.log(`deleting task ${taskId}`)

    const taskRef = doc(firestore, taskCollection(userId).path, taskId)
    return deleteDoc(taskRef)
}

export default {
    allTasks,
    updateTaskStatus,
    createTask,
    deleteTask
}