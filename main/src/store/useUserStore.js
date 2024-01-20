export const useUserStore = () => ({
    theme: 'dark',
    user: null,
    handleUser: (newUser) => set((state) => ({ user: newUser })),
  })