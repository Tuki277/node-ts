import { Express, Request, Response } from 'express'
import { createUserHandler } from './controllers/user.controller';
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from './controllers/session.controller';
import { validateRequest, requiresUser } from './middlewares';
import { createUserSchema, createUserSessionSchema } from './schema/user.schema';
import { createPostSchema, deletePostSchema, updatePostSchema } from './schema/post.schema';
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from './controllers/post.controller';

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

    //create a post
    app.post("/api/posts", [requiresUser, validateRequest(createPostSchema)], createPostHandler);

    // update a post
    app.put("/api/posts/:postId", [requiresUser, validateRequest(updatePostSchema)], updatePostHandler);

    // get a post
    app.get("/api/posts/:postId", getPostHandler);

    //delete a post
    app.delete("/api/posts/:postId", [requiresUser, validateRequest(deletePostSchema)], deletePostHandler);
}