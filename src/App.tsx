import { RouterProvider } from './app/routes/RouterProvider.tsx'
import { inspect } from 'effector/inspect'
inspect({
  fn: (e) => {
    console.log(e)
  },
})

function App() {
  return <RouterProvider />
}

export default App
