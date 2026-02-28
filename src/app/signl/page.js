import { Suspense } from 'react'
import SignlContent from './SignlContent'

export default function SignlPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading Signl...</div>
      </div>
    }>
      <SignlContent />
    </Suspense>
  )
}