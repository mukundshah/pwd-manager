import Header from '@/components/header'
import GeneratePassword from '@/components/generate-password'

const PasswordGeneratorPage = () => {
  return (
    <div className="mx-auto max-w-lg">
      <Header
        title="Password Generator"
        description="Generate password easily"
        className="mb-10"
      />

      <GeneratePassword />
    </div>
  )
}

export default PasswordGeneratorPage
