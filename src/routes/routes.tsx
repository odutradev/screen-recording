import { Navigate } from "react-router-dom";

import ScreenRecorder from "@pages/screenRecorder";

const routes = [
    {
        path: "/",
        privateRoute: false,
        routes: [
            ["*", <Navigate to="/screen-recorder" replace/>],
            ['/screen-recorder', <ScreenRecorder />],
        ]
    }
];

export default routes;