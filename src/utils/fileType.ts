import { Urls } from "./urls";
export const getFileType = (item: File): string => {
  console.log(item.type);
  if (
    item.type.includes("png") ||
    item.type.includes("jpg") ||
    item.type.includes("jpeg")
  ) {
    console.log(item.type);
    return URL.createObjectURL(item);
  } else if (item.type.includes("pdf")) return Urls.pdf;
  else if (item.type.includes("zip")) return Urls.zip;
  else if (item.type.includes("sql")) return Urls.sql;
  else if (item.type.includes("html")) return Urls.html;
  else return Urls.thumb;
};
