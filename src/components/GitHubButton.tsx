import { GithubLogo } from 'phosphor-react';
import { useAuth } from '../hooks/useAuth';

export function GitHubButton() {
  const { user, signIn } = useAuth()

  return (
    <button 
      type='button' 
      className="flex justify-center items-center gap-2 font-bold  bg-gray-600 hover:bg-gray-500 transition-colors rounded p-2"
      onClick={() => signIn({ social: "github" })}
    >
      <GithubLogo size={24}/>
      GitHub
    </button>
  )
}