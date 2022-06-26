import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";
import { cookie } from "../contexts/AuthContext";


export function Event() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

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
      <Header />
      <main className="flex flex-1">
        { slug 
        ? <Video lessonSlug={slug}/> 
        : <div className="flex-1" />}
        <Sidebar />
      </main>
    </div>
  )
}