import Form from "./Form";

import FormInput from "../FormInput/FormInput";
import { Button } from "../Button";

const meta = {
    component: Form
}

export default meta

export const Primary = {
    args: {
        title: "Login",
        onSubmit: () => alert("Form submited!"),
        children: [
            <FormInput labelText="Username">
                <input type="text" name="username" placeholder="Your username" required />
            </FormInput>,
            <FormInput labelText="Password">
                <input type="password" name="password" placeholder="Yout Password" required />
            </FormInput>,
            <Button>Login</Button>
        ]
    }
}