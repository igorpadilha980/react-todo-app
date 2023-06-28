import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase'

function taskCollection(userId) {
    return collection(firestore, 'users', userId, 'tasks')
}

function docToTask(document) {
    const data = document.data()

    return {
        id: document.id,
        title: data.title,
        description: data.description,
        completed: data.completed,
        creationTime: data.creationTime,
        lastUpdateTime: data.lastUpdateTime
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
    const newTask = { ...taskData }

    newTask.completed = false
    newTask.creationTime = serverTimestamp()

    return addDoc(taskCollection(userId), newTask)
        .then(docRef => docRef.id)
        .then(id => {
            newTask.id = id
            return newTask
        })
}

async function updateTask(userId, taskId, taskData) {
    const taskRef = doc(firestore, taskCollection(userId).path, taskId)
    const { id, creationTime, ...cleanData} = taskData

    return updateDoc(taskRef, { ...cleanData, lastUpdateTime: serverTimestamp() })
}

async function deleteTask(userId, taskId) {
    const taskRef = doc(firestore, taskCollection(userId).path, taskId)
    return deleteDoc(taskRef)
}

export default {
    allTasks,
    updateTask,
    createTask,
    deleteTask
}