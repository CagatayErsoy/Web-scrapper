import React from 'react';
import { ReactComponent as ReactIcon } from '../icons/react.svg'; // Path to React icon SVG
import { ReactComponent as NodeIcon } from '../icons/nodedotjs.svg'; // Path to Node.js icon SVG
import { ReactComponent as ExpressIcon } from '../icons/express.svg'; // Path to Express icon SVG
import { ReactComponent as PuppeteerIcon } from '../icons/puppeteer.svg'; // Path to Puppeteer icon SVG
import { ReactComponent as TailwindIcon } from '../icons/tailwindcss.svg'; // Path to Tailwind CSS icon SVG

const About = () => {
    return (
        <section className="text-slate-50 px-20 py-10">
          <h2 className="text-3xl  font-bold my-9">About Web Scraper</h2>
    
          <p className="mb-6">
            Our Web Scraper tool is built using a combination of modern technologies to ensure 
            efficient and effective web scraping capabilities. Here's a quick overview of the key 
            technologies we use:
          </p>
          
          <ul className="mb-6 list-disc gap-2">
            <li><strong className='text-react m-1'>React:</strong> A JavaScript library for building user interfaces.</li>
            <li><strong className='text-nodejs m-1'>Node.js:</strong> A JavaScript runtime for building scalable network applications.</li>
            <li><strong className='m-1'>Express:</strong> A minimal and flexible Node.js web application framework.</li>
            <li><strong className='text-puppeteer m-1'>Puppeteer:</strong> A Node library which provides a high-level API to control Chrome or Chromium.</li>
            <li><strong className='text-tailwind m-1'>Tailwind CSS:</strong> A utility-first CSS framework for rapidly building custom designs.</li>
          </ul>

          <div className="flex justify-center items-center gap-8">
          <ReactIcon className="h-10 w-10 text-react fill-current" /> {/* React Color */}
            <NodeIcon className="h-10 w-10 text-nodejs fill-current " /> {/* Node.js Color */}
            <ExpressIcon className="h-10 w-10 text-express fill-current bg-white p-1 rounded-full" /> {/* Express Color */}
            <PuppeteerIcon className="h-10 w-10 text-puppeteer fill-current" /> {/* Puppeteer Color */}
            <TailwindIcon className="h-10 w-10 text-tailwind fill-current" /> {/* Tailwind CSS Color */}
          </div>
        </section>
    );
}

export default About;