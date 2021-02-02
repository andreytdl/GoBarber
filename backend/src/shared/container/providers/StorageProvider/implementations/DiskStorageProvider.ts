import { fromString } from "uuidv4";
import IStorageProvider from "../models/IStorageProvider";
import fs from 'fs'
import path from 'path';
import uploadConfig from '@config/upload'

class DiskStorageProvider implements IStorageProvider {

    /*A ideia do savefile do DiskStorageProvider é mover da pasta tmp para tmp/uploads,
    sinalizando que o arquivo foi salvo*/
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(uploadConfig.directory, file),
            path.resolve(uploadConfig.directory, 'uploads', file)
        )

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.directory, 'uploads', file)

        try {
            //Retorna informações do item ou um erro caso não o encontrar
            await fs.promises.stat(filePath);
        } catch {
            //Caso o arquivo não existir então não temos o que deletar
            return;
        }

        //Deletando o arquivo
        await fs.promises.unlink(filePath)

    }


}

export default DiskStorageProvider