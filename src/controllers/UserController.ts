import { Request, Response } from "express";
import {
  controller,
  httpPost,
  requestParam,
  httpGet,
  httpDelete,
  httpPatch
} from "inversify-express-utils";
import { IUserService } from "../services/UserService";
import { inject } from "inversify";
import TYPES from "../types";
import { BaseCrudController } from "./BaseCrudController";
import { UserDTO } from "../models/User";

@controller("/users")
export class UserController extends BaseCrudController {
  @inject(TYPES.UserService)
  private userService!: IUserService;

  @httpGet("/:id")
  public async getById(
    @requestParam("id") id: string,
    req: Request,
    res: Response
  ): Promise<void> {
    let user: UserDTO | null = await this.userService.getById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).send();
    }
  }
  @httpPost("/")
  public async create(req: Request, res: Response): Promise<void> {
    let user: UserDTO = await this.userService.create(<UserDTO>req.body);
    res.status(201).json(user);
  }

  @httpGet("/")
  public async getAll(req: Request, res: Response): Promise<void> {
    let users: UserDTO[] = await this.userService.getAll();
    res.status(200).json(users);
  }

  @httpPatch("/:id")
  public async update(
    @requestParam("id") id: string,
    req: Request,
    res: Response
  ): Promise<void> {
    let user: UserDTO | null = await this.userService.update(
      id,
      <UserDTO>req.body
    );
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send();
    }
  }

  @httpDelete("/:id")
  public async delete(
    @requestParam("id") id: string,
    req: Request,
    res: Response
  ): Promise<void> {
    let user: UserDTO | null = await this.userService.delete(id);
    if (user) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  }
}
