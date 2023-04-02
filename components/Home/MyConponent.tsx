import React from 'react';
import AddModal from './AddModal';
import LessonCard from './LessonCard';
import LessonTile from './LessonTile';
import { XAPIWrapperProps } from './XAPIWrapper';

interface Props extends XAPIWrapperProps {
  // Props for your component
}

interface Xapi {
  initial: boolean;
  markAsComplete: boolean;
}

export interface Lesson {
  title: string;
  description: string;
  isXapiEnable: boolean;
  xapi?: Xapi;
}
export interface Lessons extends Array<Lesson> {}
const MyComponent: React.FC<Props> = ({ xAPI }) => {
  const [lesson, setLesson] = React.useState<Lessons | []>([]);
  const [selected, setSelected] = React.useState<Lesson | null>(null);

  const handleClick = () => {
    if (xAPI) {
      const statements: any = {
        actor: {
          mbox: 'mailto:user@example.com',
          name: 'John Doe',
        },
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/experienced',
          display: {
            'en-US': 'experienced',
          },
        },
        object: {
          id: 'http://example.com/activities/example-activity',
          definition: {
            name: {
              'en-US': 'Example Activity',
            },
            description: {
              'en-US': 'An example activity',
            },
          },
        },
        context: {
          extensions: {
            'http://example.com/extensions/score': {
              raw: 75,
              scaled: 0.75,
              min: 0,
              max: 100,
            },
          },
        },
      };
      xAPI.sendStatement({
        statement: statements,
      });
    }
  };

  return (
    <>
      <div>
        <button
          onClick={handleClick}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Send Statement
        </button>
        <button
          // onClick={handleAddLesson}
          data-modal-target="defaultModal"
          data-modal-toggle="defaultModal"
          type="button"
          className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          New Lesson
        </button>
      </div>
      <div className="grid grid-cols-7">
        <div className="col-span-2">
          {lesson.map((el: Lesson, index: number) => (
            <LessonTile
              key={`lessTile-${index}`}
              {...el}
              lessons={lesson}
              setLesson={setLesson}
              index={index}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
        <div className="col-span-5">
          {selected && <LessonCard {...selected} />}
        </div>
      </div>

      <AddModal setLesson={setLesson} lesson={lesson} />
    </>
  );
};

export default MyComponent;
