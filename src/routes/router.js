import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Detail from "../components/Detail";

const router = createBrowserRouter([
    {
        path:'',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path:'/Detail/:id',
                element:<Detail/>
            }
        ]
    }
])

export default router;