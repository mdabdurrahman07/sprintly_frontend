import { useSearchParams } from 'next/navigation';
import React from 'react';

const CreatePayment = () => {
    const planId : string | null = useSearchParams().get("planId")
    return (
        <div>
            
        </div>
    );
};

export default CreatePayment;