import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '#/libs/api'
import type {
  Advocate,
  AdvocateInfo,
} from '#/component/setting/SattingTypes'

// Keep all advocate keys neatly structured together
export const advocateKeys = {
  all: ['advocates'] as const,
  lists: () => [...advocateKeys.all, 'list'] as const,
  activeLists: () => [...advocateKeys.all, 'active'] as const,
  details: () => [...advocateKeys.all, 'detail'] as const,
  detail: (advocateId?: number) =>
    [...advocateKeys.details(), advocateId] as const,
  checkAdvocateId: (advocateId?: number) =>
    [...advocateKeys.all, 'check-advocate-id', advocateId] as const,
}

export function useAdvocateApi(advocateId?: number) {
  const queryClient = useQueryClient()

  // 1. GET ALL ADVOCATES
  const advocateList = useQuery({
    queryKey: advocateKeys.lists(),
    queryFn: async ({ signal }) => {
      const { data } = await api.get<AdvocateInfo[]>('/advocate', { signal })
      return data
    },
  })

  // 2. GET ACTIVE ADVOCATES
  const activeAdvocateList = useQuery({
    queryKey: advocateKeys.activeLists(),
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Advocate[]>('/advocate/active', { signal })
      return data
    },
  })

  // 3. GET ADVOCATE BY ID
  const advocateById = useQuery({
    queryKey: advocateKeys.detail(advocateId),
    queryFn: async ({ signal }) => {
      const { data } = await api.get<Advocate>(`/advocate/${advocateId}`, {
        signal,
      })
      return data
    },
    enabled: advocateId !== undefined,
  })

  // 4. CREATE ADVOCATE
  const createMutation = useMutation({
    mutationFn: async (newAdvocate: any) => {
      const { data } = await api.post('/advocate', newAdvocate, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: advocateKeys.all })
    },
  })

  // 5. UPDATE ADVOCATE
  const updateMutation = useMutation({
    mutationFn: async ({
      advocateId,
      data: payload,
    }: {
      advocateId: number
      data: Partial<Advocate>
    }) => {
      const { data } = await api.patch(`/advocate/${advocateId}`, payload)
      return data
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: advocateKeys.all })
      queryClient.invalidateQueries({
        queryKey: advocateKeys.detail(variables.advocateId),
      })
    },
  })

  // 6. DELETE ADVOCATE
  const deleteMutation = useMutation({
    mutationFn: async (advocateId: number) => {
      const { data } = await api.delete<Advocate>(`/advocate/${advocateId}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: advocateKeys.all })
    },
  })

  // 7. CHECK ADVOCATE ID
  const checkAdvocateIdQuery = useQuery({
    queryKey: advocateKeys.checkAdvocateId(advocateId),
    queryFn: async ({ signal }) => {
      const { data } = await api.get<{ isAvailable: boolean; message: string }>(
        `/advocate/check-advocate-id/${advocateId}`,
        { signal },
      )
      return data
    },
    enabled: advocateId !== undefined,
  })

  const checkAdvocateId = async (id: number) => {
    return queryClient.fetchQuery({
      queryKey: advocateKeys.checkAdvocateId(id),
      queryFn: async () => {
        const { data } = await api.get<{
          isAvailable: boolean
          message: string
        }>(`/advocate/check-advocate-id/${id}`)
        return data
      },
    })
  }

  return {
    // Queries Data & Statuses
    advocates: advocateList.data,
    isAdvocatesLoading: advocateList.isLoading,
    isAdvocatesError: advocateList.isError,
    errorAdvocates: advocateList.error,

    activeAdvocates: activeAdvocateList.data,
    isActiveAdvocatesLoading: activeAdvocateList.isLoading,
    isActiveAdvocatesError: activeAdvocateList.isError,
    errorActiveAdvocates: activeAdvocateList.error,

    advocateById: advocateById.data,
    isAdvocateByIdLoading: advocateById.isLoading,
    isAdvocateByIdError: advocateById.isError,
    errorAdvocateById: advocateById.error,

    // Mutation Trigger Methods
    createAdvocate: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isCreatingError: createMutation.isError,

    updateAdvocate: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    isUpdatingError: updateMutation.isError,

    deleteAdvocate: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
    isDeletingError: deleteMutation.isError,

    checkAdvocateId,
    checkAdvocateIdData: checkAdvocateIdQuery.data,
    isCheckAdvocateIdLoading: checkAdvocateIdQuery.isLoading,
    isCheckAdvocateIdError: checkAdvocateIdQuery.isError,
    errorCheckAdvocateId: checkAdvocateIdQuery.error,

    // Expose raw mutation objects
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
