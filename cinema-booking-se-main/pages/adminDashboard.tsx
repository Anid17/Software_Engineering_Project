import React, { useEffect } from 'react'
import axios from 'axios';
import { useCallback, useState } from "react";
import Button from '@/components/Button'
import ConfirmationDialog from '@/components/ConfirmationDialog';
import Link from 'next/dist/client/link';
import ShowtimeAdmin from '@/components/ShowtimeAdmin';
import useMovieList from '@/hooks/useMovieList';
import useUsersList from '@/hooks/useUsersList';
import useShowtimeList from '@/hooks/useShowtimeList';

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

const admin_dashboard = () => {
  const {data: movies = []} = useMovieList();
  const {data: users = []} = useUsersList();
  const {data: showtimes = []} = useShowtimeList();

  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmationMovie, setShowConfirmationMovie] = useState(false);
  const [showConfirmationUser, setShowConfirmationUser] = useState(false);
  const [showConfirmationShowtime, setShowConfirmationShowtime] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedShowtimeId, setSelectedShowtimeId] = useState('');

  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTab = (divNumber: number) => {
    setActiveTab(divNumber);
  };

  /* MOVIE */

  const handleConfirmDeleteMovie = useCallback(async (movieId) => {
    try {

      await axios.delete('/api/movies/deleteMovie', {
        data: { movieId }
      });

      localStorage.setItem('activeTab', String(activeTab));
      location.reload();

      setShowConfirmationMovie(false);

    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleCancelDeleteMovie = () => {
    setShowConfirmationMovie(false);
  };

  const handleShowConfirmationMovie = (movieId: string) => {
    setSelectedMovieId(movieId);
    setShowConfirmationMovie(true);
  };

  /* USER */

  const handleConfirmDeleteUser = useCallback(async (userId) => {
    try {

      await axios.delete('/api/users/deleteUser', {
        data: { userId }
      });
      location.reload();

      setShowConfirmationUser(false);

    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleCancelDeleteUser = () => {
    setShowConfirmationUser(false);
  };

  const handleShowConfirmationUser = (userId: string) => {
    setSelectedUserId(userId);
    setShowConfirmationUser(true);
  };

  /* SHOWTIME */

  const handleConfirmDeleteShowtime = useCallback(async (showtimeId) => {
    try {

      await axios.delete('/api/showtime/deleteShowtime', {
        data: { showtimeId }
      });
      location.reload();

      setShowConfirmationShowtime(false);

    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleCancelDeleteShowtime = () => {
    setShowConfirmationShowtime(false);
  };

  const handleShowConfirmationShowtime = (showtimeId: string) => {
    setSelectedShowtimeId(showtimeId);
    setShowConfirmationShowtime(true);
  };




  return (
    <div className='min-h-[100vh] w-full bg-primary p-[50px] flex relative'>

      {showConfirmationMovie && (
        <div>
          <ConfirmationDialog
            id={selectedMovieId}
            handleConfirmDelete={handleConfirmDeleteMovie}
            handleCancelDelete={handleCancelDeleteMovie}
          />
        </div>
      )}

      {showConfirmationUser && (
        <div>
          <ConfirmationDialog
            id={selectedUserId}
            handleConfirmDelete={handleConfirmDeleteUser}
            handleCancelDelete={handleCancelDeleteUser}
          />
        </div>
      )}

      {showConfirmationShowtime && (
        <div>
          <ConfirmationDialog
            id={selectedShowtimeId}
            handleConfirmDelete={handleConfirmDeleteShowtime}
            handleCancelDelete={handleCancelDeleteShowtime}
          />
        </div>
      )}

      <div className='min-w-[300px] h-[100vh] fixed flex flex-col'>
        <Link href="/dashboard">
          <svg className='mb-[100px]' id="Logo" xmlns="http://www.w3.org/2000/svg" width="157.243" height="35.94" viewBox="0 0 157.243 35.94">
                <g id="Symbol" transform="translate(0 0)">
                    <g id="Group_149" data-name="Group 149" transform="translate(0)">
                    <path id="Path_108" data-name="Path 108" d="M567.268,80.874a5.082,5.082,0,0,0-.661-2.139,5.141,5.141,0,0,0-1.663-1.75,5.069,5.069,0,0,0-2.307-.79c-.116-.011-.6-.021-.693-.014l-.156.011a5.079,5.079,0,0,0-2.544.92,5.242,5.242,0,0,0-1.2,1.193,5.077,5.077,0,0,0-.91,2.321,5.668,5.668,0,0,0,0,1.29,5.069,5.069,0,0,0,.768,2.111,5.161,5.161,0,0,0,1.529,1.529,5.1,5.1,0,0,0,2.36.795c.155.013.638.013.789,0a5.029,5.029,0,0,0,1.9-.531,5.1,5.1,0,0,0,2.256-2.256,5.04,5.04,0,0,0,.531-1.9C567.282,81.512,567.282,81.029,567.268,80.874Z" transform="translate(-557.098 -71.952)" fill="#fff" fill-rule="evenodd"/>
                    <path id="Path_109" data-name="Path 109" d="M592.213,74.674a7.24,7.24,0,0,0-2.783-3.955,6.923,6.923,0,0,0-1.041-.608,7.127,7.127,0,0,0-2.34-.673,10.384,10.384,0,0,0-1.4-.015,7.106,7.106,0,0,0-2.509.689,6.862,6.862,0,0,0-1.919,1.351,7.213,7.213,0,0,0-1.053,8.986,7.2,7.2,0,0,0,6.1,3.364,7.212,7.212,0,0,0,6.827-4.883A7.321,7.321,0,0,0,592.213,74.674Z" transform="translate(-564.981 -69.405)" fill="#fff" fill-rule="evenodd"/>
                    </g>
                    <path id="Path_110" data-name="Path 110" d="M609.039,103.144a2,2,0,0,0-1.365,1.013,1.771,1.771,0,0,0-.169.429l-.039.135-.006,4.19c0,3.054,0,4.228.014,4.332a2,2,0,0,0,1.181,1.5,2.085,2.085,0,0,0,1.244.092,2,2,0,0,0,1.435-1.477c.032-.144.033-.334.033-4.376v-4.225l-.049-.179a2.065,2.065,0,0,0-.828-1.146,1.8,1.8,0,0,0-.552-.253,1.548,1.548,0,0,0-.469-.052,2.3,2.3,0,0,0-.432.017" transform="translate(-576.036 -82.085)" fill="#fff" fill-rule="evenodd"/>
                    <path id="Path_111" data-name="Path 111" d="M584.556,102.6a5.109,5.109,0,0,0-4.043-4.423c-.513-.1.284-.1-9.568-.1-4.953,0-9.034,0-9.069,0a5.119,5.119,0,0,0-4.708,4.263,39.187,39.187,0,0,0-.069,4.937c.008,4.547,0,4.272.1,4.771a5.062,5.062,0,0,0,1.444,2.632,4.461,4.461,0,0,0,.74.6,5.089,5.089,0,0,0,1.809.75c.49.1-.1.092,9.678.092h9.1l.255-.041a5.119,5.119,0,0,0,4.284-4.149c.082-.448.08-.372.08-4.843C584.589,103.114,584.587,102.843,584.556,102.6Zm-8.468,5.709a10.108,10.108,0,0,1-2.481,1.1,10.042,10.042,0,0,1-5.525,0,10.1,10.1,0,0,1-2.482-1.1,10.674,10.674,0,0,1-3.721-3.895,14.639,14.639,0,0,0,17.928,0A10.669,10.669,0,0,1,576.088,108.308Z" transform="translate(-557.098 -80.187)" fill="#fff" fill-rule="evenodd"/>
                </g>
                <g className="hidden ss:flex" id="Typography" transform="translate(48.161 12.235)">
                    <path id="Path_112" data-name="Path 112" d="M640.43,92.605a1.539,1.539,0,0,0-.512-1.15,2.006,2.006,0,0,0-1.442-.489,2.121,2.121,0,0,0-1.245.323,1.016,1.016,0,0,0-.456.874,1.162,1.162,0,0,0,.11.512,1.051,1.051,0,0,0,.386.41,2.947,2.947,0,0,0,.726.323,9.42,9.42,0,0,0,1.142.268,5.843,5.843,0,0,1,2.647,1.056,2.657,2.657,0,0,1,.914,2.191v.189a3.413,3.413,0,0,1-.276,1.395,2.934,2.934,0,0,1-.8,1.063,3.641,3.641,0,0,1-1.261.678,6.065,6.065,0,0,1-3.584-.071,3.83,3.83,0,0,1-1.379-.85,3.594,3.594,0,0,1-.835-1.277,4.407,4.407,0,0,1-.283-1.6v-.473h2.08v.378a2.176,2.176,0,0,0,.575,1.584,2.4,2.4,0,0,0,1.788.59,2.049,2.049,0,0,0,1.4-.409,1.269,1.269,0,0,0,.457-.977,1.411,1.411,0,0,0-.094-.512,1.093,1.093,0,0,0-.331-.441,2.291,2.291,0,0,0-.646-.354,5.7,5.7,0,0,0-1.04-.268,10.469,10.469,0,0,1-1.528-.371,4.249,4.249,0,0,1-1.205-.606,2.606,2.606,0,0,1-.8-.945,3.077,3.077,0,0,1-.283-1.386v-.095a2.858,2.858,0,0,1,.275-1.252,3.037,3.037,0,0,1,.772-1,3.571,3.571,0,0,1,1.2-.661,4.882,4.882,0,0,1,1.568-.236,5.037,5.037,0,0,1,1.733.276,3.717,3.717,0,0,1,1.268.748,3.119,3.119,0,0,1,.772,1.088,3.279,3.279,0,0,1,.26,1.292v.568h-2.08Z" transform="translate(-634.285 -89.013)" fill="#fff"/>
                    <path id="Path_113" data-name="Path 113" d="M653.426,89.366h6.965v1.985h-4.884v2.521h4.7v1.985h-4.7V98.41h5.073V100.4h-7.154Z" transform="translate(-641.483 -89.146)" fill="#fff"/>
                    <path id="Path_114" data-name="Path 114" d="M676.175,98.032h-3.75l-.537,2.364h-2.174l2.631-11.03h3.907l2.632,11.03h-2.174Zm-3.309-1.985h2.852l-1.277-5.641h-.283Z" transform="translate(-647.608 -89.146)" fill="#fff"/>
                    <path id="Path_115" data-name="Path 115" d="M688.679,89.366h7.941v1.985h-2.931V100.4h-2.08V91.351h-2.931Z" transform="translate(-654.74 -89.146)" fill="#fff"/>
                    <path id="Path_116" data-name="Path 116" d="M712.193,99.356h.284v-9.99h2.08V100.4h-4.065l-1.292-9.99h-.283v9.99h-2.08V89.366H710.9Z" transform="translate(-661.568 -89.146)" fill="#fff"/>
                    <path id="Path_117" data-name="Path 117" d="M732.49,100.4h-3.624l-.5-8.382V90.5h-.379v1.513l-.5,8.382h-3.625l-.378-11.03h1.891l.252,8.382v1.418H726V97.748l.5-8.382h3.341l.5,8.382v1.418h.379V97.748l.252-8.382h1.891Z" transform="translate(-667.826 -89.146)" fill="#fff"/>
                    <path id="Path_118" data-name="Path 118" d="M748.094,98.032h-3.749l-.537,2.364h-2.174l2.631-11.03h3.907L750.8,100.4H748.63Zm-3.308-1.985h2.851l-1.277-5.641h-.283Z" transform="translate(-674.653 -89.146)" fill="#fff"/>
                    <path id="Path_119" data-name="Path 119" d="M760.6,89.366h7.941v1.985h-2.931V100.4h-2.08V91.351H760.6Z" transform="translate(-681.785 -89.146)" fill="#fff"/>
                    <path id="Path_120" data-name="Path 120" d="M782.523,98.593a2.322,2.322,0,0,0,.985-.181,1.46,1.46,0,0,0,.6-.489,1.858,1.858,0,0,0,.292-.709,4.309,4.309,0,0,0,.079-.827V96.1h2.08v.283a4.182,4.182,0,0,1-1.031,3.033,4,4,0,0,1-3,1.064,3.954,3.954,0,0,1-2.994-1.151,4.667,4.667,0,0,1-1.1-3.356V93.519a5.92,5.92,0,0,1,.284-1.9,3.856,3.856,0,0,1,.819-1.418,3.594,3.594,0,0,1,1.293-.882,4.485,4.485,0,0,1,1.7-.307,4.922,4.922,0,0,1,1.734.283,3.365,3.365,0,0,1,1.268.819,3.484,3.484,0,0,1,.772,1.292,5.215,5.215,0,0,1,.26,1.7v.284h-2.08v-.284a3.4,3.4,0,0,0-.094-.787,2.087,2.087,0,0,0-.315-.709,1.64,1.64,0,0,0-.6-.512,2.037,2.037,0,0,0-.946-.2,1.921,1.921,0,0,0-.9.2,1.835,1.835,0,0,0-.631.535,2.279,2.279,0,0,0-.37.788,3.649,3.649,0,0,0-.118.938v2.773a4.081,4.081,0,0,0,.11.985,2.241,2.241,0,0,0,.346.78,1.569,1.569,0,0,0,.623.512A2.191,2.191,0,0,0,782.523,98.593Z" transform="translate(-688.489 -89.013)" fill="#fff"/>
                    <path id="Path_121" data-name="Path 121" d="M796.735,89.366h2.08v4.507h3.561V89.366h2.08V100.4h-2.08V95.858h-3.561V100.4h-2.08Z" transform="translate(-695.374 -89.146)" fill="#fff"/>
                </g>
          </svg>
        </Link>
        <button onClick={() => handleTab(1)} className={`${activeTab === 1 ? 'admin-dashboard-tab-active' : 'admin-dashboard-tab-inactive'} flex p-[16px] w-full  rounded-[10px] mb-[10px]`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="21.998" height="22" viewBox="0 0 21.998 22">
            <path id="entertainment-camera-video_1_" data-name="entertainment-camera-video (1)" d="M5.856.328,5.685.341A5.58,5.58,0,0,0,2.89,1.351,5.745,5.745,0,0,0,1.572,2.662a5.581,5.581,0,0,0-1,2.551,4.686,4.686,0,0,0-.04.709,4.686,4.686,0,0,0,.04.709,5.58,5.58,0,0,0,.844,2.32A5.674,5.674,0,0,0,3.1,10.63a5.592,5.592,0,0,0,2.594.874,8.659,8.659,0,0,0,.867,0,5.54,5.54,0,0,0,2.088-.583,5.617,5.617,0,0,0,2.48-2.48,5.54,5.54,0,0,0,.583-2.088,8.66,8.66,0,0,0,0-.867,5.591,5.591,0,0,0-.726-2.35A5.651,5.651,0,0,0,9.153,1.212,5.57,5.57,0,0,0,6.618.344C6.49.332,5.954.321,5.856.328m.092,1.933a3.644,3.644,0,0,0-1.881.626,3.78,3.78,0,0,0-.978.978A3.653,3.653,0,0,0,2.5,5.38a3.265,3.265,0,0,0-.037.541c0,.114,0,.254.009.313A3.66,3.66,0,0,0,3.717,8.685a3.491,3.491,0,0,0,.8.529,3.62,3.62,0,0,0,1.213.354,6.836,6.836,0,0,0,.792,0,3.721,3.721,0,0,0,1.585-.56A3.811,3.811,0,0,0,9.211,7.9a3.721,3.721,0,0,0,.56-1.585,6.836,6.836,0,0,0,0-.792,3.642,3.642,0,0,0-.353-1.211,3.452,3.452,0,0,0-.682-.962,3.512,3.512,0,0,0-.97-.708,3.612,3.612,0,0,0-1.818-.384M16.587,3.426a3.993,3.993,0,0,0-1.411.388,3.855,3.855,0,0,0-1.079.76A4.057,4.057,0,0,0,13.5,9.628a4.052,4.052,0,0,0,3.43,1.892,4.057,4.057,0,0,0,3.839-2.746,4.117,4.117,0,0,0,.068-2.394,4.071,4.071,0,0,0-1.566-2.224,3.843,3.843,0,0,0-.585-.342,4.008,4.008,0,0,0-1.316-.379,5.831,5.831,0,0,0-.788-.009m.189,1.924a2.233,2.233,0,0,0-.373.062,2.158,2.158,0,0,0-1.009.6,2.122,2.122,0,0,0-.47,2.134,2.391,2.391,0,0,0,.246.5,2.124,2.124,0,0,0,1.535.933,2.893,2.893,0,0,0,.591-.018,2.128,2.128,0,0,0,1.738-1.778,2.5,2.5,0,0,0,.014-.5A2.113,2.113,0,0,0,18.1,5.69a2.7,2.7,0,0,0-.443-.222,2.254,2.254,0,0,0-.877-.119m-9.269,8.1a2.517,2.517,0,0,0-2.315,2.1,19.353,19.353,0,0,0-.034,2.427,12.284,12.284,0,0,0,.051,2.346,2.488,2.488,0,0,0,.71,1.294,2.2,2.2,0,0,0,.364.295,2.5,2.5,0,0,0,.89.369,40.04,40.04,0,0,0,4.758.045H16.4l.125-.02a2.516,2.516,0,0,0,2.106-2.04,15.83,15.83,0,0,0,.04-2.381c0-1.957,0-2.09-.016-2.21A2.512,2.512,0,0,0,16.67,13.5c-.252-.051.14-.047-4.7-.049-2.435,0-4.442,0-4.459,0M21.383,15.01a.983.983,0,0,0-.671.5.882.882,0,0,0-.083.211l-.019.066,0,2.06c0,1.5,0,2.079.007,2.13a.982.982,0,0,0,.581.738,1.026,1.026,0,0,0,.612.045.983.983,0,0,0,.706-.726c.016-.071.016-.164.016-2.151V15.8l-.024-.088a1.014,1.014,0,0,0-.407-.563.879.879,0,0,0-.271-.124A.761.761,0,0,0,21.6,15a1.133,1.133,0,0,0-.213.009M7.518,15.4a.585.585,0,0,0-.411.425c-.013.058-.014.261-.012,2.088l0,2.025.02.057a.611.611,0,0,0,.407.384c.055.016.212.016,4.379.016,4.693,0,4.377,0,4.491-.048a.538.538,0,0,0,.179-.126A.543.543,0,0,0,16.712,20l.025-.076V17.889c0-1.949,0-2.036-.016-2.086a.568.568,0,0,0-.151-.247.523.523,0,0,0-.256-.153c-.068-.018-.1-.018-4.4-.017-4.236,0-4.333,0-4.4.017" transform="translate(-0.531 -0.326)" fill="#fff" fill-rule="evenodd"/>
          </svg>
          <span className='ml-[16px] text-white'>Showtimes</span>
        </button>
        <button onClick={() => handleTab(2)} className={`${activeTab === 2 ? 'admin-dashboard-tab-active' : 'admin-dashboard-tab-inactive'} flex p-[16px] w-full  rounded-[10px] mb-[10px]`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
            <path id="entertainment-recording-tape-1_1_" data-name="entertainment-recording-tape-1 (1)" d="M8.471.177A8.607,8.607,0,0,0,4.4,1.388a8.762,8.762,0,0,0-2.66,2.475A8.612,8.612,0,0,0,.225,7.926a7.228,7.228,0,0,0-.042.748A8.484,8.484,0,0,0,.8,12.045a8.651,8.651,0,0,0,7.29,5.386,9.525,9.525,0,0,0,1.51,0,8.628,8.628,0,0,0,4.361-1.657,8.815,8.815,0,0,0,1.827-1.832l.1-.142,0,2.766a15.945,15.945,0,0,0,.062,3.107,3.169,3.169,0,0,0,.609,1.31,3.51,3.51,0,0,0,.354.378,3.131,3.131,0,0,0,1.743.8,4.489,4.489,0,0,0,.709,0,3.154,3.154,0,0,0,2.792-2.792c.017-.135.016-1.225,0-1.294a.8.8,0,0,0-.569-.59.98.98,0,0,0-.377-.005.758.758,0,0,0-.339.175.773.773,0,0,0-.265.5c0,.044-.009.285-.009.537a2.446,2.446,0,0,1-.048.723,1.521,1.521,0,0,1-.4.71,1.565,1.565,0,0,1-2.232.008,1.566,1.566,0,0,1-.441-.869c-.015-.083-.016-.366-.017-5.391,0-3.737,0-5.362-.012-5.5A8.519,8.519,0,0,0,16.6,5.033a8.668,8.668,0,0,0-3.943-3.968A8.508,8.508,0,0,0,8.788.173l-.317,0M8.48,1.752a7.6,7.6,0,0,0-.849.092A7.091,7.091,0,0,0,4.317,3.367a8.364,8.364,0,0,0-.806.783,7.034,7.034,0,0,0-1.4,2.429,6.954,6.954,0,0,0-.339,1.646c-.019.212-.026.744-.013.974a7.028,7.028,0,0,0,.581,2.453,7.074,7.074,0,0,0,10.638,2.886,6.983,6.983,0,0,0,.841-.723,6.356,6.356,0,0,0,.523-.581A7,7,0,0,0,15.89,9.021a6.893,6.893,0,0,0-.272-2.174,7.067,7.067,0,0,0-6.39-5.092c-.129-.008-.644-.01-.748,0m.128,3.925c-.148.015-.225.024-.315.039A3.147,3.147,0,0,0,5.7,8.48a4.5,4.5,0,0,0,0,.709,3.161,3.161,0,0,0,2.726,2.748,5.078,5.078,0,0,0,.757,0A3.157,3.157,0,0,0,11.95,9.175a5.086,5.086,0,0,0,0-.757A3.152,3.152,0,0,0,9.2,5.694a5.542,5.542,0,0,0-.594-.016m0,1.584a1.562,1.562,0,0,0-.9.458,1.541,1.541,0,0,0-.435.882,1.569,1.569,0,0,0,3.075.6,1.65,1.65,0,0,0-.005-.794,1.57,1.57,0,0,0-1.3-1.148,1.9,1.9,0,0,0-.438,0" transform="translate(-0.182 -0.172)" fill="#fff" fill-rule="evenodd"/>
          </svg>
          <span className='ml-[16px] text-white'>Movies</span>
        </button>
        <button onClick={() => handleTab(3)} className={`${activeTab === 3 ? 'admin-dashboard-tab-active' : 'admin-dashboard-tab-inactive'} flex p-[16px] w-full  rounded-[10px] mb-[10px]`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20.997" height="22" viewBox="0 0 20.997 22">
            <path id="interface-user-single" d="M67.355.313l-.18.013a5.885,5.885,0,0,0-3.186,1.235,6.625,6.625,0,0,0-.792.749,5.883,5.883,0,0,0-1.453,3.476c-.014.185-.013.648,0,.832a5.9,5.9,0,0,0,4.89,5.394,6.044,6.044,0,0,0,1.98,0A5.9,5.9,0,0,0,73.468,6.97,6.784,6.784,0,0,0,73.5,5.786a5.869,5.869,0,0,0-.621-2.249,5.969,5.969,0,0,0-2.09-2.307,5.858,5.858,0,0,0-2.662-.9c-.139-.013-.672-.024-.774-.016m-.1,1.584a4.342,4.342,0,0,0-1.949.658,4.46,4.46,0,0,0-1.1,1.01,4.323,4.323,0,0,0-.517,4.414,4.24,4.24,0,0,0,.845,1.236,4.173,4.173,0,0,0,1.212.876,4.333,4.333,0,0,0,3.763,0,4.175,4.175,0,0,0,1.212-.876,4.238,4.238,0,0,0,.94-1.464,4.336,4.336,0,0,0,.079-2.868,4.28,4.28,0,0,0-.894-1.559,4.456,4.456,0,0,0-.834-.724,4.365,4.365,0,0,0-1.778-.675,5.063,5.063,0,0,0-.977-.026m.079,11.759c-.19.007-.472.023-.62.035A10.981,10.981,0,0,0,57.225,21.1a1.045,1.045,0,0,0-.1.463.7.7,0,0,0,.08.309.767.767,0,0,0,.547.423c.077.016.357.016,9.867.017,8.786,0,9.8,0,9.866-.013a.758.758,0,0,0,.374-.188.773.773,0,0,0,.259-.529.96.96,0,0,0-.073-.41,10.966,10.966,0,0,0-2.1-3.7A11.457,11.457,0,0,0,74.8,16.317a11,11,0,0,0-3.589-2.063,10.885,10.885,0,0,0-3-.586c-.166-.009-.734-.017-.871-.012m.031,1.575a9.419,9.419,0,0,0-8.051,4.99c-.071.134-.253.5-.253.512s3.854,0,8.563,0,8.563,0,8.563,0-.039-.085-.088-.184a9.444,9.444,0,0,0-1.187-1.863,9.878,9.878,0,0,0-1.33-1.33,9.409,9.409,0,0,0-5.354-2.107c-.2-.013-.71-.023-.864-.017" transform="translate(-57.125 -0.31)" fill="#fff" fill-rule="evenodd"/>
          </svg>
          <span className='ml-[16px] text-white'>Users</span>
        </button>
        <button className={`flex p-[16px] w-full hover:bg-accent items-center mt-auto mb-[100px] rounded-[10px] justify-self-end`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21.995" viewBox="0 0 22 21.995">
            <path id="interface-logout" d="M2.084.424A2.4,2.4,0,0,0,1.16.715,2.361,2.361,0,0,0-.033,2.557c-.012.135-.012,17.58,0,17.714A2.357,2.357,0,0,0,2.11,22.4c.083.007,1.686.009,5.786.007,5.261,0,5.678,0,5.755-.018a2.374,2.374,0,0,0,.742-.242c.073-.038.173-.1.221-.127a2.373,2.373,0,0,0,1.01-1.494,10.267,10.267,0,0,0,.046-2.011V16.795l-.02-.075a.771.771,0,0,0-.233-.383.74.74,0,0,0-.386-.2,1.124,1.124,0,0,0-.314,0,.813.813,0,0,0-.556.46c-.061.144-.056-.01-.061,1.881l0,1.707-.024.078a.77.77,0,0,1-.224.359.734.734,0,0,1-.4.2c-.04.006-1.875.008-5.664.007l-5.606,0-.079-.025a.8.8,0,0,1-.53-.53L1.538,20.2V2.627l.025-.079a.8.8,0,0,1,.53-.53l.079-.025,5.606,0c3.79,0,5.625,0,5.664.007a.734.734,0,0,1,.408.2.772.772,0,0,1,.226.369l.02.065,0,1.707c0,1.577.006,1.711.02,1.763a.811.811,0,0,0,.6.577,1.12,1.12,0,0,0,.314,0,.739.739,0,0,0,.385-.2.769.769,0,0,0,.234-.384l.02-.075V4.308A10.268,10.268,0,0,0,15.625,2.3,2.367,2.367,0,0,0,13.8.463l-.15-.029C13.573.42,13.16.419,7.865.418c-3.16,0-5.738,0-5.782.006M17.95,7.489a.752.752,0,0,0-.478.229.787.787,0,0,0-.127.941,9.407,9.407,0,0,0,.981,1.017c.517.518.94.945.94.948s-2.082.007-4.627.009c-3.787,0-4.633,0-4.662.014a.831.831,0,0,0-.341.194.768.768,0,0,0-.244.662.692.692,0,0,0,.08.27.807.807,0,0,0,.556.415c.037.006,1.578.009,4.647.009,2.525,0,4.591,0,4.591.007s-.423.43-.94.948a9.4,9.4,0,0,0-.981,1.017.787.787,0,0,0,.127.941.765.765,0,0,0,.637.228.75.75,0,0,0,.363-.128c.055-.035,3.243-3.212,3.319-3.308a.8.8,0,0,0,0-.977c-.075-.093-3.264-3.272-3.317-3.306a.781.781,0,0,0-.524-.13" transform="translate(0.042 -0.417)" fill="#ffffff" fill-rule="evenodd"/>
          </svg>
          <span className='ml-[16px] text-white'>Log out</span>
        </button>
      </div>
      
      <div className='w-[calc(100%-460px)] absolute left-[410px]'>

        <div className={`${activeTab ===1 ? 'block' : 'hidden'}`} id="showtimes-tab">
          <div className='mb-[60px]'>
            <h2 className='text-[35px] text-white font-montserrat mb-[20px]'>Showtimes</h2>
            <h4 className='text-[20px] text-white font-montserrat mb-[80px]'>{showtimes?.length} Showtimes</h4>
            <div className='flex justify-between'>
              <Link href="/add_showtime">
                <Button
                  style="primary"
                  label="ADD NEW SHOWTIME"
                />
              </Link>
            </div>
          </div>

        
          <table className="table-auto w-full border-primaryvariant1 border-[1px] rounded-[10px] text-left mb-[50px]">
            <thead className='p-[30px] rounded-[10px] text-white bg-primaryvariant2'>
                <tr>
                  <th>
                    <div className='flex items-center'>
                      Movie
                      <div className='ml-[16px] flex flex-col justify-between order-buttons'>
                        <svg className='mb-[4px]' xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_1" data-name="Polygon 1" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" fill="#8b898c"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_2" data-name="Polygon 2" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" transform="translate(10 7) rotate(180)" fill="#8b898c"/>
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center'>
                      Date
                      <div className='ml-[16px] flex flex-col justify-between order-buttons'>
                        <svg className='mb-[4px]' xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_1" data-name="Polygon 1" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" fill="#8b898c"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_2" data-name="Polygon 2" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" transform="translate(10 7) rotate(180)" fill="#8b898c"/>
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center'>
                      Time
                      <div className='ml-[16px] flex flex-col justify-between order-buttons'>
                        <svg className='mb-[4px]' xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_1" data-name="Polygon 1" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" fill="#8b898c"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_2" data-name="Polygon 2" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" transform="translate(10 7) rotate(180)" fill="#8b898c"/>
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center'>
                      Type
                      <div className='ml-[16px] flex flex-col justify-between order-buttons'>
                        <svg className='mb-[4px]' xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_1" data-name="Polygon 1" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" fill="#8b898c"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_2" data-name="Polygon 2" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" transform="translate(10 7) rotate(180)" fill="#8b898c"/>
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
            <tbody>
              {showtimes.map(showtime=>(
                <tr>
                  <td>
                    <div className='flex items-center'>
                      <img className='w-[50px] rounded-[10px] mr-[20px]' src={showtime?.movie?.bannerUrl}></img>
                      <p>{showtime?.movie?.title}</p>
                    </div>
                  </td>
                  <td>{new Date(showtime?.dateTime).toLocaleDateString()}</td>
                  <td>{new Date(showtime?.dateTime).toLocaleTimeString()}</td>
                  <td>
                    <p className='text-[14px] bg-primaryvariant1 rounded-full p-[4px_12px] w-fit'>{showtime?.type}</p>
                  </td>
                  <td>
                    <div className='flex gap-[8px]'>
                      
                      <button onClick={() => handleShowConfirmationShowtime(showtime?.id)} className='bg-[rgba(249,119,55,0.14)] border-accent border-[1px] text-white p-[8px_20px] rounded-[5px] uppercase'>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`${activeTab ===2 ? 'block' : 'hidden'}`} id="movies-tab">
          <div className='mb-[60px]'>
            <h2 className='text-[35px] text-white font-montserrat mb-[20px]'>Movies</h2>
            <h4 className='text-[20px] text-white font-montserrat mb-[80px]'>{movies?.length} Movies</h4>
            <div className='flex justify-between'>
              <Link href="/insert-movie">
                <Button
                  style="primary"
                  label="ADD NEW MOVIE"
                />
              </Link>
            </div>
          </div>

          <div className='grid grid-cols-2 ss:grid-cols-4 md:grid-cols-5 gap-[28px]'>
            {movies.map(movie=>(
              <div>
                <div>
                  
                  <div className='single-movie relative'>
                    <div className='hidden gap-[10px] absolute single-movie-admin-commands z-10 top-[20px] right-[20px]'>
                      
                      <div onClick={() => handleShowConfirmationMovie(movie?.id)} className='flex items-center justify-center w-[34px] h-[34px] rounded-[5px] bg-accent shadow-[0_0_20px_rgba(0,0,0,0.5)]'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14.853" height="16" viewBox="0 0 14.853 16">
                          <path id="interface-delete-bin-1" d="M94.869.054a1.761,1.761,0,0,0-.71.332,2.206,2.206,0,0,0-.3.309,1.741,1.741,0,0,0-.333.789,8.956,8.956,0,0,0-.016,1.036l0,.952-1.749,0-1.749,0-.054.018a.575.575,0,0,0-.247.159.551.551,0,0,0-.138.246.706.706,0,0,0,0,.288.551.551,0,0,0,.138.246.536.536,0,0,0,.3.171c.071.014,13.871.014,13.941,0a.536.536,0,0,0,.3-.171.507.507,0,0,0,.1-.148.484.484,0,0,0,.05-.242.477.477,0,0,0-.014-.144.59.59,0,0,0-.385-.4l-.054-.018-1.793,0-1.793,0,0-.942c0-.851,0-.949-.013-1.016a1.7,1.7,0,0,0-.179-.567A1.684,1.684,0,0,0,99.41.2a1.492,1.492,0,0,0-.3-.118A9.945,9.945,0,0,0,96.93.042c-1.9,0-2.01,0-2.062.012m.266,1.114a.545.545,0,0,0-.306.153.553.553,0,0,0-.125.174c-.052.112-.048.018-.05,1.053l0,.923h4.57l0-.917,0-.917L99.2,1.587a.594.594,0,0,0-.408-.408l-.051-.014H96.958c-.989,0-1.8,0-1.824,0m-3.409,4.6a.536.536,0,0,0-.278.146.561.561,0,0,0-.182.41c0,.024.259,2.116.576,4.65.608,4.862.582,4.667.625,4.752a.587.587,0,0,0,.4.308c.048.009.443.01,4.11.01s4.061,0,4.11-.01a.59.59,0,0,0,.4-.3c.045-.089.016.128.627-4.755.317-2.534.576-4.626.576-4.65a.561.561,0,0,0-.182-.41.54.54,0,0,0-.424-.153.452.452,0,0,0-.2.046.573.573,0,0,0-.324.394c-.006.026-.252,1.985-.548,4.352s-.539,4.313-.541,4.325l0,.021H93.487l0-.021c0-.011-.245-1.958-.541-4.325S92.4,6.224,92.394,6.2A.573.573,0,0,0,92.07,5.8a.64.64,0,0,0-.085-.032.867.867,0,0,0-.26-.006" transform="translate(-89.554 -0.041)" fill="#fff" fill-rule="evenodd"/>
                        </svg>
                      </div>
                    </div>
                   <img src={movie?.bannerUrl} className='h-full rounded-[10px] hover:-[2px] hover:outline-white'></img>
                  </div>
                </div>
              </div>
            ))}
            
          </div>

        </div>

        <div className={`${activeTab ===3 ? 'block' : 'hidden'}`} id="users-tab">
          <div className='mb-[60px]'>
            <h2 className='text-[35px] text-white font-montserrat mb-[20px]'>Users</h2>
            <h4 className='text-[20px] text-white font-montserrat mb-[80px]'>{users?.length} Users</h4>
          </div>
          <table className="table-auto w-full border-primaryvariant1 border-[1px] rounded-[10px] text-left mb-[50px]">
            <thead className='p-[30px] rounded-[10px] text-white bg-primaryvariant2'>
                <tr>
                  <th>
                    <div className='flex items-center'>
                      User
                      <div className='ml-[16px] flex flex-col justify-between order-buttons'>
                        <svg className='mb-[4px]' xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_1" data-name="Polygon 1" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" fill="#8b898c"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_2" data-name="Polygon 2" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" transform="translate(10 7) rotate(180)" fill="#8b898c"/>
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className='flex items-center'>
                      Tickets
                      <div className='ml-[16px] flex flex-col justify-between order-buttons'>
                        <svg className='mb-[4px]' xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_1" data-name="Polygon 1" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" fill="#8b898c"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 10 7">
                          <path id="Polygon_2" data-name="Polygon 2" d="M4.186,1.139a1,1,0,0,1,1.627,0l3.057,4.28A1,1,0,0,1,8.057,7H1.943a1,1,0,0,1-.814-1.581Z" transform="translate(10 7) rotate(180)" fill="#8b898c"/>
                        </svg>
                      </div>
                    </div>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
            <tbody>
              {users.map(user=>(
                <tr>
                  <td className='w-full'>
                    <div className='flex items-center'>
                      <img className='w-[40px] h-[40px] object-cover rounded-full mr-[20px]' src={user?.avatar}></img>
                      <p>{user?.firstName} {user?.lastName}</p>
                    </div>
                  </td>
                  <td>{user?.tickets?.length}</td>
                  <td>
                      <button onClick={() => handleShowConfirmationUser(user?.id)} className='bg-[rgba(249,119,55,0.14)] border-accent border-[1px] text-white p-[8px_20px] rounded-[5px] uppercase'>Delete</button>
                  </td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default admin_dashboard