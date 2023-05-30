import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "@firebase/firestore";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { afterAll, afterEach, assert, describe, expect, test } from "vitest";

const testEnv = await initializeTestEnvironment({ projectId: 'test-app' })

describe('rules test suite', () => {
    const testUserId = 'test-user';
    const testUserData = {
        id: testUserId,
        username: 'John Doe',
        email: 'john@email.com'
    }

    const app = testEnv.authenticatedContext(testUserId)
    const firestore = app.firestore()

    afterAll(async () => {
        await testEnv.cleanup()
    })

    afterEach(async () => {
        await testEnv.clearFirestore()
    })

    test('if users can read their own profile', async () => {
        await testEnv.withSecurityRulesDisabled(async (superApp) => {
            await setDoc(doc(superApp.firestore(), '/users/', testUserId), testUserData)
        })

        const request = getDoc(doc(firestore, '/users', testUserId)).then(doc => doc.data())

        await expect(request).resolves.toMatchObject(testUserData)
    })

    test('if users can not read others profile', async () => {
        const request = getDoc(doc(firestore, '/users', 'another-user-doc'))

        expect(request).rejects.toMatchObject({
            code: expect.stringMatching(/permission-denied/i)
        })
    })

    test('if users can create their own profile', async () => {
        const request = setDoc(doc(firestore, '/users', testUserId), testUserData);

        await request.catch(e => assert(false, e.message))
    })

    test('if user can add new tasks', async () => {
        const request = addDoc(collection(firestore, 'users', testUserId, 'tasks'), {
            title: 'Task',
            description: 'Test task',
            completed: false
        })

        await request.catch((e) => assert(false, e.message))
    })

    test('if user can delete task', async () => {
        const taskId = 'user-task';
        await setDoc(doc(firestore, 'users', testUserId, 'tasks', taskId), {
            title: 'Task',
            description: 'Test task',
            completed: false
        })
        
        const request = deleteDoc(doc(firestore, 'users', testUserId, 'tasks', taskId));
        await request.catch(e => assert(false, e.message))
    })

    test('if can list tasks of user', async () => {
        const tasksCollection = collection(firestore, 'users', testUserId, 'tasks');

        await addDoc(tasksCollection, {
            title: 'Task',
            description: 'Test task',
            completed: false
        })

        const request = getDocs(tasksCollection).then(snap => snap.docs);

        expect(request).resolves.toHaveLength(1)
    })
})