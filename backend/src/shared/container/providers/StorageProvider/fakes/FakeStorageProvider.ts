import { fromString } from "uuidv4";
import IStorageProvider from "../models/IStorageProvider";
import fs from 'fs'
import path from 'path';
import uploadConfig from '@config/upload'

export default class DiskStorageProvider implements IStorageProvider {

    private storage: string[] = []

    /*A ideia do savefile do DiskStorageProvider é mover da pasta tmp para tmp/uploads,
    sinalizando que o arquivo foi salvo*/
    public async saveFile(file: string): Promise<string> {
        this.storage.push(file)
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const findIndex = this.storage.findIndex(
            storageFile => storageFile === file,
        );

        this.storage.splice(findIndex, 1);

    }


}