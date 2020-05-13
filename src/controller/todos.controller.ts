import express, { Request, Response } from "express";
import {
  controller,
  httpPost,
  requestParam,
  BaseHttpController,
  HttpResponseMessage,
  StringContent
} from "inversify-express-utils";

@controller("/todos")
export class TodoController extends BaseHttpController {
  @httpPost("/process-sheet/:fileId")
  public async processSheet(
    @requestParam("fileId") fileId: string,
    req: Request
  ) {}
}
