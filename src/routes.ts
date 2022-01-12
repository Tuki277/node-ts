import { Express, Request, Response } from 'express'
import { createUserHandler } from './controllers/user.controller';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './controllers/session.controller';
import { validateRequest, requiresUser } from './middlewares';
import { createUserSchema, createUserSessionSchema } from './schema/user.schema';

export default function (app: Express) {
    app.get("/test", (req: Request, res: Response) => res.sendStatus(200));

    // Register user
    // Post /api/use
    app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

    //Login
    //Post /api/sessions
    app.post("/api/sessions", validateRequest(createUserSessionSchema), createUserSessionHandler);

    //Get the user's sessions
    //Get /api/sessions
    app.get("/api/sessions", requiresUser, getUserSessionsHandler)

    //Logout
    //Delete /api/sessions
    app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler)
}