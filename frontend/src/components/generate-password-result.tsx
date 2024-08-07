'use client'

import { Input } from '@/components/ui/input'
import CopyToClipboard from '@/components/copy-to-clipboard'

interface GeneratePasswordResultProps {
  generatedPassword: string
}

const GeneratePasswordResult = ({ generatedPassword }: GeneratePasswordResultProps) => {
  return (
    <div className="flex space-x-3">
      <Input
        placeholder="your password generated"
        defaultValue={generatedPassword}
        disabled
      />

      <CopyToClipboard text={generatedPassword} />
    </div>
  )
}

export default GeneratePasswordResult
