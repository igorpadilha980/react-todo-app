import FormInput from './FormInput'

const meta = {
    component: FormInput
}

export default meta

export const Input = {
    args: {
        labelText: "Username",
        children: [
            <input type="text" name="username" placeholder="Username"/>
        ]
    }
}

export const TextArea = {
    args: {
        labelText: "Details",
        children: [
            <textarea name="details" placeholder="Product details"></textarea>
        ]
    }
}