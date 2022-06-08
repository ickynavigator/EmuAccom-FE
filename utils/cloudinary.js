import { Notifications as message } from "./Notifications";

/**
 *  Handles the cloudinary uploads and gets the url
 *
 *  @param {{
 *      fileToUpload: File,
 *      successCB: (secureUrl: string) => void,
 *      errorCB?: (err: any) => void,
 *      doneCB?: () => void
 *  }} props
 */
export async function handleFileUpload(props) {
  const { fileToUpload } = props;
  const formData = new FormData();

  formData.append("file", fileToUpload);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_PRESET);

  const options = { method: "POST", body: formData };

  fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, options)
    .then(res => res.json())
    .then(res => {
      const { secure_url: secureUrl } = res;
      if (secureUrl) {
        message.success("Image Uploaded");

        if (props.successCB) props.successCB(secureUrl);
      } else {
        message.error("An error has occured. Please try again");
      }
    })
    .catch(err => {
      message.error("An error has occured. Please try again");

      if (props.errorCB) props.errorCB(err);
    })
    .finally(() => {
      if (props.doneCB) props.doneCB();
    });
}

/**
 * @param {File} preview
 */
export async function parseBlob(preview) {
  return fetch(preview)
    .then(r => r.blob())
    .then(
      blobFile =>
        new File([blobFile], preview.name || new Date().toDateString(), {
          type: preview.type,
          ...preview,
        }),
    )
    .then(res => res);
}
