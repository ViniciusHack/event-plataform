import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { cookie } from "../contexts/AuthContext";


export function Event() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if(!cookie.get("user") || cookie.get("user") === "null") {
      return navigate("/");
    }
    if(!slug) {
      return navigate("/event/lesson/abertura-do-evento-ignite-lab")
    }
  }, [])


  return (
    <div className="flex flex-col min-h-screen">
      <Header openSidebar={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen}/>
      <main className="flex flex-1">
        { slug 
        ? <Video lessonSlug={slug} isSidebarOpen={isSidebarOpen} /> 
        : <div className="flex-1" />}
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </main>
    </div>
  )
}