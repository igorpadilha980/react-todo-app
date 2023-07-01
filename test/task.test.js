import { initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { afterEach, assert, describe, expect, test, vi } from 'vitest'

const testEnv = await initializeTestEnvironment({ projectId: 'test-app' })

describe('task service suite', async () => {
    const testUserId = 'test-user'
    const testTaskData = {
        title: 'Test task',
        description: 'Test task description'
    }

    const app = testEnv.authenticatedContext(testUserId)
    const firestore = app.firestore()

    vi.doMock('../src/services/firebase', () => {
        return {
            firestore
        }
    })

    afterEach(async () => {
        await testEnv.clearFirestore()
    })

    const { firebaseTaskService } = await import('../src/services/tasks')
    const taskService = firebaseTaskService(testUserId)

    test('if creates add task to user', async () => {
        const savedTask = await taskService.addTask(testTaskData);
        expect(savedTask).toMatchObject({
            id: expect.any(String),
            completed: expect.any(Boolean),
            ...testTaskData
        })

        const listRequest = getDocs(collection(firestore, 'users', testUserId, 'tasks')).then(snap => snap.docs)
        await expect(listRequest).resolves.toHaveLength(1)
    })

    test('if can fetch tasks from user', async () => {
        await taskService.addTask(testTaskData)

        const taskList = await taskService.fetchTasks()
        expect(taskList).toHaveLength(1)
    })

    test('if updates task data', async () => {
        const task = await taskService.addTask(testTaskData)
        const newStatus = true

        await taskService.updateTask(task.id, { completed: newStatus })

        const updatedTask = await getDoc(doc(firestore, 'users', testUserId, 'tasks', task.id)).then(doc => doc.data())
        assert(updatedTask.completed == newStatus)
    })

    test('if deletes task from user', async () => {
        const task = await taskService.addTask(testTaskData)
        await taskService.deleteTask(task.id)

        const userTasks = await taskService.fetchTasks();
        expect(userTasks).toHaveLength(0)
    })
})