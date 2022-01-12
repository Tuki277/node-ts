import { Request, Response } from "express";
import { omit } from "lodash";
import { createUser } from "../services/user.service";
import log from '../logger'

export async function createUserHandler (req: Request, res: Response)
{
    try {
        const user = await createUser(req.body);
        return res.status(201).json({ "data" : omit(user.toJSON(), "password") });
    } catch (error: any) {
        return res.status(409).send(error.message)
    }
}

export async function createUserSessionHandler (req: Request, res: Response) {
    //validate the email and password

    //create a session

    // create access token

    // create refresh token

    //send refresh & access token back
}