import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type ChatCardProps = {
    name: string;
    message: string;
    date: string;
};

const ChatCard = ({ name, message, date }: ChatCardProps) => {
    return (
      <div className="p-4 mb-4 flex justify-between">
        <div className="flex items-center mb-2">
          <div className="bg-gray-200 rounded-full w-10 h-10 mr-4">
          <Avatar className='mb-2'>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="avatar"
                    className=''
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
          </div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-gray-500 text-sm">{message}</p>
          </div>
        </div>
        <p className="text-[--prodile-yellow] text-sm">{date}</p>
      </div>
    );
  };


export default ChatCard
