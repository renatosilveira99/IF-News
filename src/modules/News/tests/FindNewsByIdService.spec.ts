import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { CreateNewsService } from '../services/CreateNewsService';
import { FindNewsByIdService } from '../services/FindNewsByIdService';

let createNewsService: CreateNewsService;
let newsRepositoryInMemory: NewsRepositoryInMemory;
let findNewsByIdService: FindNewsByIdService;
let storageProviderInMemory: StorageProviderInMemory;

describe('Find news by id', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    );

    findNewsByIdService = new FindNewsByIdService(
      newsRepositoryInMemory
    );
  });

  it('should be able to find news by id', async () => {
    const news = {
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
    }

    const createdNews = await createNewsService.execute(news)

    const foundNews = await findNewsByIdService.execute({ id: createdNews.id })

    expect(foundNews).toHaveProperty('id', createdNews.id);
  });

  it('should throw an error if the news is not found', async () => {
    await expect(
      findNewsByIdService.execute({ id: 'fake-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
