import { IStorageProvider } from '../models/IStorageProvider';

export class StorageProviderInMemory implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    this.storage.findIndex(
      (storageFile) => storageFile === file,
    );
  }
}