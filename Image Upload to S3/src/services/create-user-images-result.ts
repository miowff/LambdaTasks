import { ImageModel } from "src/models/image-model";
import s3Service from "./s3-service";

export async function createUserImagesResult(imagesKeys:string[]):Promise<ImageModel[]>
{
    const result:ImageModel[]=[];
    for(let i = 0;i<imagesKeys.length;i++)
    {
        const splitedKey = imagesKeys[i].split('/');
        const imageModel:ImageModel=
        {
            ImageKey:imagesKeys[i],
            ImageName:splitedKey[splitedKey.length-1],
            AccessUrl:await s3Service.createAccessUrl(imagesKeys[i])
        }
        result.push(imageModel);
    }
    return result;
}