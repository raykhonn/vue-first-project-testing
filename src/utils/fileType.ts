import { Urls } from "./urls";
export const getFileType = (item: File): string => {
  if (item.type.includes("png" || "jpeg")) return URL.createObjectURL(item);
  else if (item.type.includes("pdf")) return Urls.pdf;
  else if (item.type.includes("zip")) return Urls.zip;
  else if (item.type.includes("sql")) return Urls.sql;
  else if (item.type.includes("html")) return Urls.html;
  else return Urls.thumb;
};
