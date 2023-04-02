import Image from 'next/image';
import React from 'react';
import { Lesson } from './MyConponent';
import { XAPIClient } from './Xapi';

const LessonCard: React.FC<Lesson> = (props) => {
  const xapi = XAPIClient.getInstance();

  const imgLoader = () => {
    const min = 190;
    const max = 200;
    const random = Math.floor(Math.random() * (max - min) + min);
    return `https://random.imagecdn.app/1080/${random}`;
  };

  const handleComplete = () => {
    if (props?.isXapiEnable) {
      if (props?.xapi?.markAsComplete) {
        let data = {
          object: {
            id: 'http://example.com/activities/example-activity',
            definition: {
              name: {
                'en-US': props?.title,
              },
              description: {
                'en-US': 'An example activity',
              },
            },
          },
          verb: {
            id: 'http://adlnet.gov/expapi/verbs/completed',
            display: {
              'en-US': 'completed',
            },
          },
        };
        console.log('from card', data);

        xapi.sendStatement(data);
      }
    }
  };
  React.useEffect(() => {
    if (props?.isXapiEnable || false) {
      let data = {
        object: {
          id: 'http://example.com/activities/example-activity',
          definition: {
            name: {
              'en-US': props?.title,
            },
            description: {
              'en-US': 'An example activity',
            },
          },
        },
      };
      console.log('from card', data);

      xapi.sendStatement(data);
    }
  }, [props, xapi]);

  return (
    <div className="p-5 bg-white border border-gray-100 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={props?.isXapiEnable}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          xAPI
        </span>
      </label>

      <a href="#">
        <Image
          loader={imgLoader}
          width={1080}
          height={200}
          // key={`img-${title}`}
          className="rounded-t-lg"
          src="img.png"
          alt=""
        />
      </a>
      <div className="">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props?.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {props?.description}
        </p>
        <a
          onClick={handleComplete}
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 "
        >
          Mark as Complete
          <svg
            aria-hidden="true"
            className="w-4 h-4 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default LessonCard;
