import { useState, useEffect } from 'react'

export function useFinanceOverview() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    fetch('/api/finance-overview')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return { data }
}
