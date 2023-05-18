import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase'

const taskCollection = collection(firestore, 'tasks')

function docToTask(document) {
    const data = document.data()

    return {
        id: document.id,
        title: data.title,
        description: data.description,
        completed: data.completed
    }
}

async function allTasks() {
    const search = query(taskCollection);

    return getDocs(search)
            .then(snapshot => snapshot.docs)
            .then(docs => {
                return docs.map(docToTask)
            })
}

async function createTask(taskData) {
    const newTask = { ...taskData, completed: false }
    console.log("creating task: ", newTask)

    return addDoc(taskCollection, newTask)
        .then(docRef => docRef.id)
        .then(id => {
            newTask.id = id
            return newTask
        })
}

async function updateTaskStatus(taskId, newStatus) {
    console.log(`updating task ${taskId}, status: ${newStatus}`)

    const taskRef = doc(firestore, taskCollection.path, taskId)
    return updateDoc(taskRef, { completed: newStatus })
}

async function deleteTask(taskId) {
    console.log(`deleting task ${taskId}`)

    const taskRef = doc(firestore, taskCollection.path, taskId)
    return deleteDoc(taskRef)
}

export default {
    allTasks,
    updateTaskStatus,
    createTask,
    deleteTask
}