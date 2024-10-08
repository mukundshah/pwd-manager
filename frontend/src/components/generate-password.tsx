'use client'

import React, { useState } from 'react'
import GeneratePasswordResult from './generate-password-result'
import GeneratePasswordForm from '@/components/forms/generate-password-form'

const GeneratePassword = () => {
  const [generatedPassword, setGeneratedPassword] = useState<
    string | undefined
  >(undefined)

  return (
    <div className="space-y-3">
      <GeneratePasswordResult generatedPassword={generatedPassword as string} />
      <GeneratePasswordForm setGeneratedPassword={setGeneratedPassword} />
    </div>
  )
}

export default GeneratePassword
