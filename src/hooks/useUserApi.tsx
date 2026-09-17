import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "#/libs/api";

export type UserRole = 'ADMIN' | 'USER' | 'OFFICE';

export interface User {
    id?: number;
    userName: string;
    name: string;
    contact: string;
    password?: string;
    role: UserRole;
}

// Fixed: Keep all user keys neatly structured together
export const userKeys = {
    all: ['users'] as const,
    lists: () => [...userKeys.all, 'list'] as const,
    details: () => [...userKeys.all, 'detail'] as const,
    detail: (id?: number) => [...userKeys.details(), id] as const,
};

export function useUserApi(id?: number) {
    const queryClient = useQueryClient();
    // const apiInstance = useApi();


    // 1. GET ALL USERS
    const userList = useQuery({
        queryKey: userKeys.lists(), // Used lists sub-key to avoid colliding with detail invalidation
        queryFn: async ({ signal }) => { // Added abort signal
            const { data } = await api.get<User[]>('/users', { signal });
            return data;
        },
        // staleTime: 5 * 60 * 1000, // Fixed: 5 minutes (1000ms * 60s * 5)
        // gcTime: 10 * 60 * 1000,   // Fixed: 10 minutes
    });

    // 2. GET USER BY ID
    const userById = useQuery({
        queryKey: userKeys.detail(id),
        queryFn: async ({ signal }) => { // Added abort signal
            const { data } = await api.get<User>(`/users/${id}`, { signal });
            return data;
        },
        enabled: id !== undefined,
        // staleTime: 5 * 60 * 1000, // Fixed
        // gcTime: 10 * 60 * 1000,   // Fixed
    });

    // 3. CREATE USER
    const createMutation = useMutation({
        mutationFn: async (newUser: User) => {
            const { data } = await api.post<User>('/users', newUser);
            return data;
        },
        onSuccess: () => {
            // Invalidates all user cache data to refresh the views
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        }
    });

    // 4. UPDATE USER
    const updateMutation = useMutation({
        // Change payload to explicitly split id from the update data
        mutationFn: async ({ id, data: payload }: { id: number; data: Partial<User> }) => {
            const { data } = await api.put<User>(`/users/${id}`, payload);
            return data;
        },
        onSuccess: (_data, variables) => {
            // Invalidates the global list
            queryClient.invalidateQueries({ queryKey: userKeys.all });

            // This is now 100% type-safe and guaranteed to exist!
            queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
        }
    });

    // 5. DELETE USER
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => {
            const { data } = await api.delete<User>(`/users/${id}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.all });
        }
    });

    return {
        // Queries Data & Statuses
        users: userList.data,
        isUsersLoading: userList.isLoading,
        isUsersError: userList.isError,
        errorUsers: userList.error,

        userById: userById.data,
        isUserByIdLoading: userById.isLoading,
        isUserByIdError: userById.isError,
        errorUserById: userById.error,

        // Fixed: Mutation Trigger Methods exposed properly (.mutate)
        createUser: createMutation.mutateAsync,
        isCreating: createMutation.isPending,
        isCreatingError: createMutation.isError,

        updateUser: updateMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        isUpdatingError: updateMutation.isError,

        deleteUser: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
        isDeletingError: deleteMutation.isError,

        // Expose the raw mutation objects if components need properties like reset()
        createMutation,
        updateMutation,
        deleteMutation
    };
}
