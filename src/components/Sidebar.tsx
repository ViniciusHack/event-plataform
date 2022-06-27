import classNames from "classnames";
import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

interface SiderbarProps {
  isSidebarOpen: boolean;
}

export function Sidebar({ isSidebarOpen }: SiderbarProps) {
  const { data } = useGetLessonsQuery();

  return (
    <aside className={classNames("w-[348px] bg-gray-700 p-6 border-l border-gray-600 lg:block hidden", {
      "block": isSidebarOpen,
    })}>
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">
        {data?.lessons.map(lesson => (
          <Lesson
            key={lesson.id}
            availableAt={new Date(lesson.availableAt)} 
            type={lesson.lessonType}
            title={lesson.title} 
            slug={lesson.slug}
          />
        ))}
      </div>
    </aside>
  )
}