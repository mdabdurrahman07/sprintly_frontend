import { Zap } from 'lucide-react';
import React from 'react';

const Logo = () => {
    return (
        <div className='flex items-center gap-1.5'>
           <div className='bg-primary w-10 h-10 rounded-xl flex justify-center items-center'>
             <Zap className='text-background'/>
           </div>
            <div className='text-foreground font-bold text-xl'>
                Sprintly
            </div>
        </div>
    );
};

export default Logo;