import PayBill from '@/components/Modules/Payment/PayBill';
import React, { Suspense } from 'react';

const payBillPage = () => {
    return (
        <div>
            <Suspense fallback={<p className="py-16 text-center text-sm text-muted-foreground">Loading plan details...</p>}>
                <PayBill/>
            </Suspense>
        </div>
    );
};

export default payBillPage;