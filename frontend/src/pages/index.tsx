import React from 'react'
import { Link } from 'react-router-dom'
import { KeyIcon, LockIcon, ShieldCheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const HomePage = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 text-center">
        <h1 className="mb-4 text-4xl font-bold">Welcome to PWD Manager</h1>
        <p className="mb-8 text-xl">Secure your digital life with our advanced password manager.</p>
        <Button asChild size="lg">
          <Link to="/sign-up">Get Started</Link>
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="mb-12 text-center text-3xl font-bold">Why Choose PWD Manager?</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LockIcon className="mr-2" />
                {' '}
                Secure Storage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Your passwords are encrypted and stored safely, accessible only to you.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShieldCheckIcon className="mr-2" />
                {' '}
                Password Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create strong, unique passwords with our built-in generator.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <KeyIcon className="mr-2" />
                {' '}
                Easy Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access your passwords securely from any device, anytime.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Secure Your Passwords?</h2>
        <p className="mb-8 text-xl">Join thousands of users who trust PWD Manager for their password management.</p>
        <Button asChild size="lg">
          <Link to="/sign-up">Create Your Account</Link>
        </Button>
      </section>
    </div>
  )
}

export default HomePage
