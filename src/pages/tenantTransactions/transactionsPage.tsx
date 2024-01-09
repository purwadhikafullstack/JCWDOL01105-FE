import { useGetAPI} from '@/lib/service';
import MainNavBarTenant from '@/components/mainNavBarTenant/mainNavBarTenant';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import SalesChart from '@/components/transactions/salesChart';
import Occupancy from '@/components/transactions/occupancy';
import ProtectedRouteTenant from '@/components/auth/ProtectedRouteTenant';
import { useContext } from 'react';
import { AuthContext } from '@/app/AuthContext';
import OrderCard from '@/components/transactions/orderCards';



const TransactionsPage: React.FC = () => {

    console.log("Transaction Page");
    const { token } = useContext(AuthContext)
    const config = {
        headers: {
            "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`
        },
    }

    const { data, isFetched, refetch } = useGetAPI(`/api/orderList`, "orders", config);
    const { data:dataChart, isFetched:isFetchedChart, refetch: refetchChart } = useGetAPI(`/api/orderList/chartData`, "ordersChart", config);
    const displayCard = () => {
        if (data && isFetched)
            return data.map((orders: any, index: number) => (<OrderCard key={index} order={orders} />)
            )
        else { refetch() }
    }
    return (
        <ProtectedRouteTenant>
            <div >
                <MainNavBarTenant />
                <br />
                <Tabs defaultValue="userOrders" className="w-[900px]  ">
                    <TabsList>
                        <TabsTrigger value="userOrders" className='w-[300px] p-2 '>Order</TabsTrigger>
                        <TabsTrigger value="reportSales" className='w-[300px] p-2 '>Sales</TabsTrigger>
                        <TabsTrigger value="occupancy" className='w-[300px] p-2 '>Occupancy</TabsTrigger>
                    </TabsList>
                    <TabsContent value="userOrders">
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[70%]">
                        {displayCard()}
                    </div>
                    </TabsContent>
                    <TabsContent value="reportSales" >
                    <div>
                    <SalesChart data={dataChart}/>
                    </div>
                    </TabsContent>
                    <TabsContent value="occupancy">
                    <Occupancy/>
                    </TabsContent>
                </Tabs>
            </div>
        </ProtectedRouteTenant >
    );
}

export default TransactionsPage;



