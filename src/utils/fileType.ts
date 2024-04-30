import { Urls } from "./urls";
export const getFileType = (item: File): string => {
  if (item.type.includes("png") || item.type.includes("jpeg")) {
    return URL.createObjectURL(item);
  } else if (item.type.includes("pdf")) {
    return Urls.pdf;
  } else if (item.type.includes("zip")) {
    return Urls.zip;
  } else if (item.type.includes("sql")) {
    return Urls.sql;
  } else if (item.type.includes("html")) {
    return Urls.html;
  } else {
    return "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png";
  }
};
