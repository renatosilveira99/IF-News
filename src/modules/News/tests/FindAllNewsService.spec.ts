import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { CreateNewsService } from '../services/CreateNewsService';
import { FindAllNewsService } from '../services/FindAllNewsService';

let createNewsService: CreateNewsService;
let findAllNewsService: FindAllNewsService;
let newsRepositoryInMemory: NewsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;

describe('Find all news', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();

    storageProviderInMemory = new StorageProviderInMemory();

    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    )

    findAllNewsService = new FindAllNewsService(
      newsRepositoryInMemory,
    );
  });

  it('should be able list all news', async () => {
    const news1 = {
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

    const news2 = {
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

    await createNewsService.execute(news1)
    await createNewsService.execute(news2)

    const allNews = await findAllNewsService.execute();

    expect(allNews).toBeInstanceOf(Array);
    expect(allNews).toHaveLength(2);
  });
}); 
