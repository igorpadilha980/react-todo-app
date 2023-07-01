import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import PageLayout from "./PageLayout";

const meta = {
    component: PageLayout,
    decorators: [
        (Story) => (
            <BrowserRouter>
                <AuthContext.Provider value={{ isSigned: () => false }}>
                    <Story />
                </AuthContext.Provider>
            </BrowserRouter>
        )
    ]
}

export default meta

export const Primary = {
    args: {
        children: [
            <h1>Page content</h1>,
            <p>Some text</p>
        ]
    }
}