import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyImageAction } from "@/app/actions/patchMyImage.action";

export default function usePatchMyImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => patchMyImageAction(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
