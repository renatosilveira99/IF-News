import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { DeleteProjectService } from '../services/DeleteProjectService';

export class DeleteProjectController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const deleteProjectService = container.resolve(DeleteProjectService);

    await deleteProjectService.execute({ id });

    return response.status(200).send()
  }
}