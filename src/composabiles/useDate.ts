export const useDate = () => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr)
      return null

    try {
      const d = new Date(dateStr)
      if (isNaN(d.getTime())) return null
      return d.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return null
    }
  }

  return {
    formatDate
  }
}
