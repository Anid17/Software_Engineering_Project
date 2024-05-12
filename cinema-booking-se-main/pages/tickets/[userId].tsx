import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Ticket from '@/components/Ticket';
import useTicketsList from '@/hooks/useTicketsList';
import { useRouter } from 'next/router';
import React from 'react'

import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import useCurrentUser from '@/hooks/useCurrentUser'

export async function getServerSideProps(context: NextPageContext) {
	const session = await getSession(context);
  
	if (!session) {
	  return {
		redirect: {
		  destination: '/auth',
		  permanent: false,
		}
	  }
	}
  
	return {
	  props: {}
	}
  }

const Tickets = () => {
	const router = useRouter();
	const { userId } = router.query;
	const { data: tickets } = useTicketsList(userId as string);

  return (
    <div className="px-[9.5vw]">
       <Navbar/>
        <div className='mt-[80px]'>  
          <h2 className='text-[35px] text-white font-montserrat mb-[20px]'>My Tickets</h2>
        </div>
        <div className='mt-[80px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[28px]'>
					{tickets?.map((ticket) => {
					const dateTime = new Date(ticket?.dateTime);
					const date = dateTime.toLocaleDateString('en-US');
					const time = dateTime.toLocaleTimeString('en-US', {
						hour: '2-digit',
						minute: '2-digit',
					});

					return (
						<Ticket
							key={ticket.id}
							movieName={ticket?.movie?.title}
							movieImage={ticket?.movie?.bannerUrl}
							date={date}
							time={time}
							seat={ticket?.seatNumber}
							hall={ticket?.hallNumber}
							barcode={ticket?.barcode}
						/>
					);
				})}
            
            
        </div>
        <Footer/>
    </div>
  )
}

export default Tickets