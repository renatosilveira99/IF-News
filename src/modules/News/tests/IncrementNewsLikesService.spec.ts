import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { CreateNewsService } from '../services/CreateNewsService';
import { IncrementNewsLikesService } from '../services/IncrementNewsLikesService'

let createNewsService: CreateNewsService;
let storageProviderInMemory: StorageProviderInMemory;
let newsRepositoryInMemory: NewsRepositoryInMemory;
let incrementNewsLikesService: IncrementNewsLikesService;

describe('Increment news likes', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();

    storageProviderInMemory = new StorageProviderInMemory();

    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    );

    incrementNewsLikesService = new IncrementNewsLikesService(
      newsRepositoryInMemory,
    );
  });

  it('should be able to increment a news likes', async () => {
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

    await incrementNewsLikesService.execute({ id, userId: 'fake-userId' });

    await incrementNewsLikesService.execute({ id, userId: 'fake-userId' });

    const newsCreated = await newsRepositoryInMemory.findById(
      id
    );

    expect(newsCreated).toHaveProperty('likes', 2);
  });

  it('should not be able to increment news likes if the news does not exist', async () => {
    await expect(
      incrementNewsLikesService.execute({ id: 'invalid-id', userId: 'fake-userId' })
    ).rejects.toBeInstanceOf(AppError);
  })
});
