import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { CreateNewsService } from '../services/CreateNewsService';

let createNewsService: CreateNewsService;
let newsRepositoryInMemory: NewsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;

describe('Create news', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();
    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    );
  });

  it('should be able to create new news', async () => {
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

    const { id } = await createNewsService.execute(news);

    const newsCreated = await newsRepositoryInMemory.findById(
      id
    );

    expect(newsCreated).toHaveProperty('title', news.title);
  });
});
