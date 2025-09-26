import React from 'react'
import { useAuthStore } from '../store/useAuthStore';

function ChatPage() {
  const {login} = useAuthStore();

  return (
    <>
      <div>ChatPage</div>
      <button 
        className="btn-primary z-10" 
        onClick={login}
      >Login Button</button>
    </>
  )
}

export default ChatPage;