type CloudinaryResponse = {
  width: string;
  height: string;
  secure_url: string;
};

type APIResponse = {
  url: string;
  preset: string;
  avatar: string;
};

/* 
      [TBC] unable to get file from FormData in /api/imageHandler 
      username would be exposed if you check network tab, do not know how to solve it! 20220613
      this method is not to use dotenv library 
*/

export default async function imageUploader(imgFile: File, isAvatar?: boolean) {
  const apiRes = await fetch("/api/imageHandler");
  const { url, preset, avatar } = (await apiRes.json()) as APIResponse;
  const uploadPreset = isAvatar ? avatar : preset;

  const formData = new FormData();
  formData.append("file", imgFile);
  formData.append("upload_preset", uploadPreset);

  const cloudinaryRes = await fetch(url, {
    method: "POST",
    body: formData,
  });
  const { secure_url } = (await cloudinaryRes.json()) as CloudinaryResponse;

  return secure_url;
}
