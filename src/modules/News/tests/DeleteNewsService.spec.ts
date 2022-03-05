import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { CreateNewsService } from '../services/CreateNewsService';
import { DeleteNewsService } from '../services/DeleteNewsService';
import { UpdateNewsImagesService } from '../services/UpdateNewsImagesService'

let createNewsService: CreateNewsService;
let newsRepositoryInMemory: NewsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;
let deleteNewsService: DeleteNewsService;
let updateNewsImagesService: UpdateNewsImagesService;

let news = null;
let images = null;

describe('Delete news', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();

    storageProviderInMemory = new StorageProviderInMemory();

    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    );

    updateNewsImagesService = new UpdateNewsImagesService(
      newsRepositoryInMemory,
      storageProviderInMemory
    );

    deleteNewsService = new DeleteNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    )

    news = {
      title: 'fake-title',
      subtitle: 'fake-subtitle',
      description: 'fake-description',
      status: 'fake-status',
      extraLink: 'fake-extraLink',
      campus: 'fake-campus',
      authorId: 'fake-authorId',
      coverImage: 'fake-coverImage',
      likes: 0,
      views: 0,
      images: '[]',
    }

    images = [{
      fieldname: 'images',
      originalname: 'b3.jpg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      destination: '/usr/app/tmp',
      filename: 'f751be61e5b132441731-b3.jpg',
      path: '/usr/app/tmp/f751be61e5b132441731-b3.jpg',
      size: 11939
    }]

  });

  it('should be able to delete a news', async () => {
    const { id } = await createNewsService.execute(news);

    const newsCreated = await newsRepositoryInMemory.findById(
      id
    );

    await deleteNewsService.execute({ id: newsCreated.id });

    const newsDeleted = await newsRepositoryInMemory.findById(
      id
    );

    expect(newsDeleted).toBeFalsy();
  });

  it('should not be able to delete a news that does not exist', async () => {
    await expect(deleteNewsService.execute({ id: 'fake-id' })).rejects.toBeInstanceOf(AppError);
  })

  it('should delete images', async () => {
    const createdNews = await createNewsService.execute(news);

    await updateNewsImagesService.execute({
      id: createdNews.id,
      images
    });

    await deleteNewsService.execute({ id: createdNews.id });

    const newsDeleted = await newsRepositoryInMemory.findById(
      createdNews.id
    )

    expect(newsDeleted).toBeFalsy();
  });
});
