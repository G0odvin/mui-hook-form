import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Schema } from "../types/schema"
import { mapData } from "../utils/mapData";
import { omit } from "lodash";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Schema) => await axios.post('http://localhost:8080/users', omit(mapData(data), 'variant')),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      console.log('onError')
    }
  })
};

export function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Schema) => {
      if (data.variant === 'update') {
        await axios.put(`http://localhost:8080/users/${data.id}`, omit(mapData(data), 'variant')
        );
        alert('User edited successfully!')
      }
    },

    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });

      if (variables.variant === 'update') {
        await queryClient.invalidateQueries({ queryKey: ['user', { id: variables.id }] });
      }
    },
  })
}