import axios from "axios";

export async function uploadSingle(file: File) {
  const data = new FormData();
  data.append("tenantId", "test");
  data.append("module", "test");
  data.append("fileName", "test" + file?.name);
  data.append("file", file);

  const response = await axios.post(
    "http://192.168.100.241:9999/api/file/upload/public",
    data
  );
  return response;
}
