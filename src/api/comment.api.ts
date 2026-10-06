import apiClient from "@/lib/apiClient"

const prefix = "/comments"

export const deleteCommentApi = (id: string) => {
    return apiClient(`${prefix}/${id}`, {method: "DELETE"})

}