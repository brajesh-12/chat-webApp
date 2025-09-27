import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { useAuthStore } from "../store/useAuthStore";

function ChatPage() {
  const { logOut } = useAuthStore();

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900" >
      <div className="relative w-full max-w-6xl md:h-[800px] h-[650px]" >
        <BorderAnimatedContainer>
          <p className="text-zinc-100">hello this is chat screen</p>
          <div className="justify-center items-center">
            <button className="btn-primary bg-red-400" onClick={logOut}>
              Logout
            </button>
          </div>

        </BorderAnimatedContainer>
      </div>
    </div>
  )
}

export default ChatPage;