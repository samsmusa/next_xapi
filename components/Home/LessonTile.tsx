import Link from 'next/link';
import { Lesson, Lessons } from './MyConponent';

interface props extends Lesson {
  index: number;
  lessons: Lessons;
  setLesson: any;
  setSelected: any;
  selected: any;
}
export default function LessonTile(props_: props) {
  const { setSelected, lessons, setLesson, selected, ...lesson } = props_;
  const handleDelete = (index: number) => {
    const lesson__ = [...lessons];
    const newlesson = lesson__.splice(index, 1);
    console.log(newlesson, lesson__);
    setLesson([...lesson__]);
  };
  return (
    <div
      className={`max-w-sm ${
        selected?.title === lesson?.title ? 'bg-blue-200' : 'bg-white'
      } border border-gray-200 rounded-lg shadow`}
    >
      <div className="p-5 grid grid-cols-3 items-center justify-between">
        <div className="col-span-2 flex justify-between items-center">
          <Link href="#">
            <h5 className="text-md font-bold tracking-tight text-gray-700">
              {lesson?.title?.slice(0, 20)}
            </h5>
          </Link>
          <div className="mr-6 flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                className="sr-only peer"
                checked={lesson?.isXapiEnable}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-1 col-span-1">
          <button
            onClick={() => setSelected(lesson)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300"
          >
            Read
          </button>

          <button
            onClick={() => handleDelete(lesson.index)}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
