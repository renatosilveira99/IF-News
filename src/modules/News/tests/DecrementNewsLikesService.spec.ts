import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory';
import AppError from '../../../utils/AppError';
import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { CreateNewsService } from '../services/CreateNewsService';
import { DecrementNewsLikesService } from '../services/DecrementNewsLikesService'

let createNewsService: CreateNewsService;
let storageProviderInMemory: StorageProviderInMemory;
let newsRepositoryInMemory: NewsRepositoryInMemory;
let decrementNewsLikesService: DecrementNewsLikesService;

describe('Decrement news likes', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory
    );

    decrementNewsLikesService = new DecrementNewsLikesService(
      newsRepositoryInMemory,
    );
  });

  it('should be able to decrement news likes', async () => {
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

    await decrementNewsLikesService.execute({ id: newsCreated.id, userId: 'fake-userId' });

    expect(newsCreated).toHaveProperty('likes', -1);
  });

  it('should not be able to decrement news likes if the news does not exists', async () => {
    await expect(decrementNewsLikesService.execute({ id: 'fake-id', userId: 'fake-userId' })).rejects.toBeInstanceOf(AppError);
  })
});
