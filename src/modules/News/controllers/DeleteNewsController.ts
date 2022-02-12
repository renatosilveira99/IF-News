import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { DeleteNewsService } from '../services/DeleteNewsService';

export class DeleteNewsController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteNewsService = container.resolve(DeleteNewsService);

    await deleteNewsService.execute({ id });

    return response.status(200).send()
  }
}