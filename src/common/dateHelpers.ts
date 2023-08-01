export const formatListDate = (item: string) =>
  new Date(item)
    .toLocaleString('default', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .slice(0, -3)

export const formatDetailsDate = (item: string) => new Date(item).toLocaleDateString()
