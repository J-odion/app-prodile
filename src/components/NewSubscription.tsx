import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Plus } from 'lucide-react';
import React from 'react'
import { Card } from './ui/card';

const NewSubscription = () => {
    return (
      <Card className="p-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-[#404040]">New Subscription</h2>
          <button className="bg-transparent border-2 border-[--prodile-yellow] border-dotted rounded-full w-8 h-8 flex items-center justify-center">
            <Plus size={20} className='text-[--prodile-yellow]'/>
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {["John", "Henry", "Mary", "Anita", "Mary"].map((name, idx) => (
            <div key={idx} className="text-center">
              <Avatar className='mb-2'>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                    className='rounded-full w-16 h-16'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              <p>{name}</p>
            </div>
          ))}
        </div>
      </Card>
    );
  };

export default NewSubscription
