import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory'
import { UpdateNewsService } from '../services/UpdateNewsService'
import { CreateNewsService } from '../services/CreateNewsService';
import AppError from '../../../utils/AppError';

let newsRepositoryInMemory: NewsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;
let createNewsService: CreateNewsService;
let updateNewsService: UpdateNewsService;

let news = null

describe('Update News', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    updateNewsService = new UpdateNewsService(
      newsRepositoryInMemory,
    );

    createNewsService = new CreateNewsService(
      newsRepositoryInMemory,
      storageProviderInMemory,
    );

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
    }
  });

  it('should be able to update news', async () => {

    const createdNews = await createNewsService.execute(news);

    const updatedNews = await updateNewsService.execute({
      id: createdNews.id,
      title: 'fake-title-2',
      subtitle: 'fake-subtitle-2',
      description: 'fake-description-2',
      status: 'fake-status-2',
      extraLink: 'fake-extraLink-2',
      campus: 'fake-campus-2',
      authorId: 'fake-authorId',
    });

    expect(updatedNews).not.toBeNull();
    expect(updatedNews.title).toBe('fake-title-2');
    expect(updatedNews.description).toBe('fake-description-2');
  });

  it('should not be able to update non existing news', async () => {
    await expect(
      updateNewsService.execute({
        id: 'fake-id',
        title: 'fake-title-2',
        subtitle: 'fake-subtitle-2',
        description: 'fake-description-2',
        status: 'fake-status-2',
        extraLink: 'fake-extraLink-2',
        campus: 'fake-campus-2',
        authorId: 'fake-authorId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});