export const deleteGameMutation = async (gameId: string) => {
  return fetch(`/games/${gameId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};