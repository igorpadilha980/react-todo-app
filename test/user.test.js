import { afterAll, afterEach, describe, expect, it, vi } from 'vitest'

import { initializeTestEnvironment } from '@firebase/rules-unit-testing'
import { doc, setDoc } from 'firebase/firestore'

const testEnv = await initializeTestEnvironment({ projectId: 'test-app' })

const testUserId = 'test-user'
const testUserData = {
    id: testUserId,
    username: 'John Doe',
    email: 'test@email.com'
}

describe('user service suite', async () => {
    const app = testEnv.authenticatedContext(testUserId)
    const firestore = app.firestore()

    vi.doMock('../src/firebase/firebase', () => ({
        firestore
    }))

    afterEach(async () => {
        await testEnv.clearFirestore()
    })

    afterAll(async () => {
        await testEnv.cleanup()
    })

    const { fetchUser, createUser } = await import('../src/user/user')

    it("should fail when reading other's profile", async () => {
        const request = fetchUser('different-user')

        await expect(request).rejects.toMatchObject({ code: expect.stringMatching(/permission-denied/i) })
    })

    it('should be able to read own profile', async () => {
        await setDoc(doc(firestore, 'users', testUserId), testUserData)

        const request = fetchUser(testUserId)
        await expect(request).resolves.toEqual(testUserData)
    })

    it('should create user profile', async () => {
        await createUser(testUserData.id, testUserData.username, testUserData.email)
        const savedUser = await fetchUser(testUserData.id)

        expect(savedUser).toMatchObject(testUserData)
    })
})