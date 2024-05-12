import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import Link from 'next/link'
import { getSession } from "next-auth/react"
import { useRouter } from 'next/router';
import useCurrentUser from '@/hooks/useCurrentUser'

const get_tickets = () => {
	const router = useRouter();
	const { data: currentUser } = useCurrentUser();
	const userId = currentUser?.id;

  return (
    <div className="px-[9.5vw] min-h-[100vh]">
        <Navbar/>
        <div className='mt-[80px] w-full flex flex-col items-center justify-center'>
            <div className='bg-accent w-[80px] h-[80px] rounded-full flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 2500 2500" version="1.1">
                    <path d="M 2308 176.950 C 2288.420 179.962, 2273.119 184.841, 2256.843 193.263 C 2235.836 204.133, 2220.034 217.366, 2201.035 240 C 2195.726 246.325, 1869.033 641.650, 1475.050 1118.500 C 1081.068 1595.350, 757.526 1986.747, 756.069 1988.271 L 753.419 1991.043 525.315 1697.763 C 399.858 1536.459, 293.763 1400.538, 289.548 1395.718 C 273.032 1376.826, 249.813 1360.914, 226.390 1352.435 C 182.523 1336.556, 135.777 1338.157, 96.500 1356.883 C 50.805 1378.670, 17.327 1418.658, 5.569 1465.500 C -7.048 1515.760, 1.465 1563.555, 30.230 1603.944 C 40.416 1618.247, 493.776 2200.711, 503.065 2211.428 C 553.561 2269.694, 626.509 2309.619, 704 2321.403 C 738.307 2326.621, 780.327 2325.886, 814.928 2319.463 C 863.536 2310.441, 913.253 2288.557, 953.529 2258.457 C 977.114 2240.831, 994.518 2223.456, 1023.106 2189 C 1083.449 2116.269, 2461.444 448.409, 2465.660 443 C 2487.277 415.270, 2498.321 384.981, 2499.690 349.674 C 2500.773 321.752, 2495.871 295.328, 2485.311 272.154 C 2465.661 229.035, 2423.267 192.890, 2377.937 180.608 C 2356.578 174.820, 2330.660 173.465, 2308 176.950" stroke="none" fill="#ffffff" fill-rule="evenodd"></path>
                </svg>
            </div> 
            <p className='my-[60px] text-text text-center'>Thank your for your purchase.<br></br>Enjoy your movie</p>
            <div className='flex gap-[16px]'>
                <div onClick={() => router.push(`/tickets/${userId}`)}>
                    <Button style="secondary" label="GO TO TICKETS" />
                </div>
                <div onClick={() => router.push(`/`)}>
                    <Button style="primary" label="GO TO DASHBOARD" />
                </div>
            </div>
            
        </div>
        <Footer/>
    </div>
  )
}

export default get_tickets