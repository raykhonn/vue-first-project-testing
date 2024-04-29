export const getFileType = (item: File) => {
  switch (true) {
    case item.type.includes("png"):
    case item.type.includes("jpeg"):
      return URL.createObjectURL(item);
    case item.type.includes("pdf"):
      return "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w";
    case item.type.includes("zip"):
      return "https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/folder_zip.png";
    case item.type.includes("sql"):
      return "https://www.shareicon.net/data/2015/09/07/97430_document_512x512.png";
    case item.type.includes("html"):
      return "https://cdn4.iconfinder.com/data/icons/smashicons-file-types-flat/56/22_-_HTML_File_Flat-512.png";
    default:
      return "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png";
  }
};
