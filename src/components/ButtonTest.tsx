"use client"
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'
import { toast } from 'sonner'

export default function ButtonTest() {
  const { logout } = useAuthStore();
  const handleClick = () => {
    logout();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button onClick={handleClick}>Button</Button>
    </main>
  )
}
