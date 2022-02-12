import { IStorageProvider } from '../entities/IStorageProvider';

export class StorageProviderInMemory implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    console.log('Deleting file: ', this.storage);

    const findIndex = this.storage.findIndex(
      (storageFile) => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }
}