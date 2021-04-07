import { _post } from './index'

//上传
export const uploadImage = (file) => {
    let data = new FormData();
    data.append("file", {
        name: file.fileName,
        type: file.type,
        uri: file.uri,
        size: file.fileSize
    });
    let req = {
        data,
        url: 'v1/upload_img'
    };
    return _post(req);
};
