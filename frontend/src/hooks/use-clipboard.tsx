import { useCallback, useEffect, useState } from 'react'

type UseCopyToClipboardReturn = [boolean, () => void]

export const useCopyToClipboard = (text: string): UseCopyToClipboardReturn => {
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = async (str: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(str)
      return true
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err)
      return false
    }
  }

  const copy = useCallback(() => {
    if (!copied) {
      copyToClipboard(text).then(setCopied)
    }
  }, [text, copied])

  useEffect(() => {
    return () => setCopied(false)
  }, [text])

  return [copied, copy]
}
