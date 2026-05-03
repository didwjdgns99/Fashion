import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyImageAction } from "@/app/actions/myImage.action";
import { deleteMyImageAction } from "@/app/actions/myImage.action";

export function usePatchMyImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => patchMyImageAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

export function useDeleteMyImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMyImageAction(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
