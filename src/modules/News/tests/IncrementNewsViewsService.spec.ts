import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { CreateNewsService } from '../services/CreateNewsService';
import { IncrementNewsViewsService } from '../services/IncrementNewsViewsService'

let createNewsService: CreateNewsService;
let storageProviderInMemory: StorageProviderInMemory;
let newsRepositoryInMemory: NewsRepositoryInMemory;
let incrementNewsViewsService: IncrementNewsViewsService;

describe('Increment news views', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();

    storageProviderInMemory = new StorageProviderInMemory();

    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    );

    incrementNewsViewsService = new IncrementNewsViewsService(
      newsRepositoryInMemory,
    );
  });

  it('should be able to increment news likes', async () => {
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
      images: '[]',
    }

    const { id } = await createNewsService.execute(news);

    const newsCreated = await newsRepositoryInMemory.findById(
      id
    );

    await incrementNewsViewsService.execute({ id: newsCreated.id });

    expect(newsCreated).toHaveProperty('views', 1);
  });

  it('should not be able to increment news likes if the news does not exist', async () => {
    await expect(
      incrementNewsViewsService.execute({ id: 'invalid-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
