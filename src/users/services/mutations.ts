import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Schema } from "zod"

export const useCreateUser = () => {
const queryClient = useQueryClient();

  return useMutation({
    mutationFn:  async (data: Schema) => await axios.post('http://localhost:8080/users', data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      console.log('onError')
    }
  })
}