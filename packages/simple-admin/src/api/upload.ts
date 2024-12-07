import { post } from "@/composable/use-request";

export const mediaUploadAsync = (params: FormData) => {
  return post("/media/upload", params, {
    headers: {
      "Content-Type": "application/form-data"
    }
  })
}

