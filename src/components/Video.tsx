import '@vime/core/themes/default.css';
import { DefaultUi, Player, Youtube } from '@vime/react';
import classNames from 'classnames';
import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";
import { useGetLessonBySlugQuery } from '../graphql/generated';

interface VideoProps {
  lessonSlug: string;
  isSidebarOpen: boolean;
}


export function Video({ lessonSlug, isSidebarOpen }: VideoProps) {
  const { data } = useGetLessonBySlugQuery({
    variables: {
      slug: lessonSlug
    },
    initialFetchPolicy: 'network-only'
  });

  if(!data || !data.lesson) {
    return (
      <div className={classNames("flex-1 grid place-items-center", {
        "hidden": isSidebarOpen,
        "grid": !isSidebarOpen
      })}>
        <span>Carregando...</span>
      </div>
    )
  }

  return (
    <div className={classNames("flex-1", {
      "hidden": isSidebarOpen,
      "block": !isSidebarOpen
    })}>
      <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId} />
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="md:flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6">
                <img 
                  src={data.lesson.teacher.avatarURL}
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                />

                <div className="leading-relaxed">
                  <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                  <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 md:pt-0 pt-6">
            <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
              <DiscordLogo size={24}/>
              Comunidade do Discord
            </a>
            
            <a href="#" className="p-4 text-sm text-blue-500 border border-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors">
              <Lightning size={24}/>
              Acesse o desafio
            </a>
          </div>
        </div>

        <div className="gap-8 mt-20 grid md:grid-cols-2 grid-cols-1">
          <a 
            href="#" 
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40} />
            </div>

            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Material complementar</strong>
              <p className="text-sm text-gray-200 mt-2">
                Acesse o material complementar para acelerar o seu desenvolvimento
              </p>
            </div>

            <div className="h-full p-6 items-center hidden md:flex">
              <CaretRight size={24} />
            </div>
          </a>

          <a 
            href="#" 
            className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
          >
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40} />
            </div>

            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Wallpapers exclusivos</strong>
              <p className="text-sm text-gray-200 mt-2">
                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
              </p>
            </div>

            <div className="h-full p-6 items-center hidden md:flex">
              <CaretRight size={24} />
            </div>
          </a>

        </div>
      </div>
    </div>
  )
}