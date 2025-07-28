import { Button } from '../../ui/Button'
import { useAuthenticator } from '@aws-amplify/ui-react'

type LogoutButtonProps = {}

export const LogoutButton = ({}: LogoutButtonProps) => {
  const { signOut } = useAuthenticator()

  return (
    <Button variant={'outline'} onClick={signOut}>
      Log out
    </Button>
  )
}
