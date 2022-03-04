import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { CreateNewsService } from '../services/CreateNewsService';
import { FindNewsByCampusService } from '../services/FindNewsByCampusService';

let createNewsService: CreateNewsService;
let newsRepositoryInMemory: NewsRepositoryInMemory;
let findNewsByCampusService: FindNewsByCampusService;
let storageProviderInMemory: StorageProviderInMemory;

describe('Find news by campus', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();

    storageProviderInMemory = new StorageProviderInMemory();

    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    );

    findNewsByCampusService = new FindNewsByCampusService(
      newsRepositoryInMemory
    );
  });

  it('should be able to find news by campus', async () => {
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

    const foundNews = await findNewsByCampusService.execute({ campus: createdNews.campus })

    expect(foundNews).toBeInstanceOf(Array);
    expect(foundNews).toHaveLength(1);
  });
});
