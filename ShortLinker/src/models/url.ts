import mongoose from "mongoose";
import {generateShortString} from '../generateShortString';
import constants from "../constants";

const urlSchema = new mongoose.Schema(
{
    fullUrlPath:
    {
        type:String,
        required:true
    },
    shortUrlPath:
    {
        type:String,
        required:true,
        default:generateShortString(8)
    },
    hostUrl:
    {
        type:String,
        requiredPaths:true,
        default:constants.HOST_URL
    }
});

export default mongoose.model('ShortUrl',urlSchema)