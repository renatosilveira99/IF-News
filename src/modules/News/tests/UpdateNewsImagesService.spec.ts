import { NewsRepositoryInMemory } from '../repositories/in-memory/NewsRepositoryInMemory';
import { StorageProviderInMemory } from '../../../shared/container/StorageProvider/in-memory/StorageProviderInMemory'
import { UpdateNewsImagesService } from '../services/UpdateNewsImagesService'
import { CreateNewsService } from '../services/CreateNewsService';
import AppError from '../../../utils/AppError';

let newsRepositoryInMemory: NewsRepositoryInMemory;
let storageProviderInMemory: StorageProviderInMemory;
let createNewsService: CreateNewsService;
let updateNewsImagesService: UpdateNewsImagesService;

let news = null
let images = null

describe('Update News Images', () => {
  beforeEach(() => {
    newsRepositoryInMemory = new NewsRepositoryInMemory();
    storageProviderInMemory = new StorageProviderInMemory();

    updateNewsImagesService = new UpdateNewsImagesService(
      newsRepositoryInMemory,
      storageProviderInMemory,
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

  it('should be able to update news images', async () => {

    const createdNews = await createNewsService.execute(news);

    const updatedNews = await updateNewsImagesService.execute({
      id: createdNews.id,
      images
    });

    expect(updatedNews.images).not.toBeNull();
  });

  it('should not be able to update images from non existing news', async () => {
    await expect(
      updateNewsImagesService.execute({
        id: 'non-existing-news-id',
        images
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old images when updating new ones', async () => {
    const deleteFile = jest.spyOn(storageProviderInMemory, 'deleteFile');

    const createdNews = await createNewsService.execute(news);

    await updateNewsImagesService.execute({
      id: createdNews.id,
      images
    });

    await updateNewsImagesService.execute({
      id: createdNews.id,
      images
    });

    expect(deleteFile).toHaveBeenCalledWith(images[0].filename);
  });
});