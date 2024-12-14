import { post, get } from "@/composable/use-request";

export const getPageListAsync = (params: { id?: number; page?:number; size?:number }) => {
  return get("/page/list", params)
}

export const getPageByIdAsync = (id: number) => {
  return get("/page/" + id)
}

export const createPageAsync = (params: { name?:string; content?:string }) => {
  return post("/page/create", params)
}

export const updatePageAsync = (params: { id?:number; name?:string; content?:string }) => {
  return post("/page/update", params)
}

export const deletePageAsync = (id: number) => {
  return post("/page/delete/", { id })
}
