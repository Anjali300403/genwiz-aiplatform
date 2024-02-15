import React from 'react';
import { Heading } from '@/components/heading'; // Assuming Heading component is imported from a file
import { UserCog } from 'lucide-react';
import Image from 'next/image';
import TypewriterComponent from 'typewriter-effect';

function AbtmePage() {
  return (
    <div>
      <Heading
        title="My name is Anjali"
        description="A fourth year student at Vellore Institute Of Technology, Vellore"
        icon={UserCog}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />
      <div className="flex flex-wrap items-center">
      <div>
        <Image
          className='ml-3 rounded-lg'
          width={200}
          height={200}
          src="/me.jpg"
          alt="myface"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="ml-4 text-center justify-center items-center">
        <p className="font-bold text-lg text-blue-500">Frontend Developer</p>
        <p className="font-bold text-lg text-blue-500">Cloud Enthusiast</p>
        <p className="font-bold text-lg text-blue-500">Technical Writer</p>

      </div>
    </div>
    <div className="bg-gray-200 p-6 rounded-lg max-w-lg w-full mt-5 ml-3">
  <p className="text-lg text-grey-800 mb-4 flex justify-center font-bold">To know more about me</p>
  <div className="flex flex-wrap justify-around">
    <a href="https://www.linkedin.com/in/anjali-jha-b6189122a/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn</a>
     <a href="https://github.com/Anjali300403" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://medium.com/iet-vit/stochastic-optimization-algorithm-9c3236c19d50" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Medium</a>
    <a href="https://anjali300403.github.io/resume-updated/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">My skills</a>
  </div>
  <div> 
    <p className="text-lg text-grey-800 mt-4 mb-3 flex justify-center font-bold">Contact me</p>
    <div className="flex justify-around"> 
      <a href="mailto:anjalijha172003@gmail.com" className="text-blue-500 hover:underline">Email</a>
      
    </div>
  </div>
</div>


    </div>
    
  );
}

export default AbtmePage;
