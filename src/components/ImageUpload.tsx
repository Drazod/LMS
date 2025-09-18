type ImageUploadProps = {
  setImage: (url: string) => void;
  setPublicId: (id: string) => void;
};

export const ImageUpload = ({ setImage, setPublicId }: ImageUploadProps) => {
  const uploadImage = async (e: { target: { files: any; }; }) => {
    const files = e.target.files;
    const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", import.meta.env.VITE_REACT_APP_UPLOAD_PRESET);
    data.append("cloud_name", cloudName);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.url);
    setPublicId(file.public_id);
  };

  return (
    <div>
      <input
        id="dropzone-file"
        type="file"
        className="hidden"
        onChange={uploadImage}
      />
    </div>
  );
}
