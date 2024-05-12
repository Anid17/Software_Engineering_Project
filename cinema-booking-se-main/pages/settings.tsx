import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Input from '@/components/Input'
import Button from '@/components/Button'

const settings = () => {
  return (
    <div className="px-[9.5vw]">
      <Navbar/>
      <div className='mt-[80px]'>  
        <div className='flex items-center gap-[16px] mb-[40px]'>
          <img className='w-[100px] h-[100px] rounded-full' src="https://media.licdn.com/dms/image/D4D03AQHHrT3c9SuSVA/profile-displayphoto-shrink_800_800/0/1681178361056?e=2147483647&v=beta&t=WVaWa2-u2nXWCyGZ8vLohoU2e7XjvanICZYezFuAVzc"></img>
          <h4 className='text-white text-[24px]'>Adnan<br></br>Brkić</h4>
        </div>
        <div>
          <h6 className='text-[20px] text-white mb-[8px]'>User Settings</h6>
          <p className='text-text '>Update your profile photo and other details</p>
        </div>
        <div className='bg-primaryvariant1 h-[1px] w-full my-[40px]'></div>
        <div className='flex flex-col m:flex-row'>
          <div className='w-full m:w-2/6 pr-[40px] mb-[40px] m:mb-0'>
            <h6 className='text-[20px] text-white mb-[8px]'>Profile photo</h6>
            <p className='text-text '>Chose an image that represents you or your brand.</p>
          </div>
          <div className='w-full m:w-4/6'>
            <div className='flex flex-col ss:flex-row mb-[40px] ss:mb-0 gap-[28px]'>
                <div className='w-[100px] h-[100px] rounded-full bg-primaryvariant1 aspect-square'></div>
                <div className='border-primaryvariant1 w-full border-[1px] border-dashed rounded-[20px] flex flex-col items-center justify-center py-[50px]'>
                  <div className='w-[50px] h-[50px] rounded-full bg-primaryvariant1 flex items-center justify-center mb-[16px] cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15.722" height="20" viewBox="0 0 15.722 20">
                      <path id="interface-upload-button-1_1_" data-name="interface-upload-button-1 (1)" d="M275.241.377a.73.73,0,0,0-.321.146c-.032.026-.717.706-1.52,1.511-1.128,1.13-1.469,1.476-1.5,1.52a.8.8,0,0,0-.1.233.89.89,0,0,0,0,.335.747.747,0,0,0,.418.485.615.615,0,0,0,.287.051.514.514,0,0,0,.186-.022.791.791,0,0,0,.206-.1c.02-.013.419-.406.886-.873l.85-.849,0,4.184c0,3.908,0,4.188.016,4.239a.708.708,0,0,0,.215.37.69.69,0,0,0,.307.173.875.875,0,0,0,.36,0,.69.69,0,0,0,.307-.173.708.708,0,0,0,.215-.37c.013-.051.014-.332.016-4.239l0-4.185.85.849c.468.467.866.86.886.873a.793.793,0,0,0,.206.1.514.514,0,0,0,.186.022.615.615,0,0,0,.287-.051.759.759,0,0,0,.365-.345.723.723,0,0,0-.041-.708c-.029-.044-.37-.39-1.5-1.52-.8-.8-1.486-1.484-1.517-1.508A.764.764,0,0,0,275.561.4a.627.627,0,0,0-.18-.02c-.066,0-.129,0-.14,0m-6.429,6.428a1.44,1.44,0,0,0-1.3,1.229c-.013.083-.014.364-.014,5.556,0,5.279,0,5.472.015,5.557a1.45,1.45,0,0,0,.335.732,1.423,1.423,0,0,0,.883.483c.073.011.707.013,6.628.013s6.555,0,6.628-.013a1.423,1.423,0,0,0,.883-.483,1.449,1.449,0,0,0,.335-.732c.014-.085.015-.278.015-5.557,0-5.192,0-5.473-.014-5.556a1.426,1.426,0,0,0-.406-.812,1.411,1.411,0,0,0-.919-.418c-.067,0-.406-.007-.869-.005-.824,0-.784,0-.908.047a.746.746,0,0,0-.316.24.72.72,0,0,0-.04.8.765.765,0,0,0,.426.32,4.966,4.966,0,0,0,.911.028h.7V18.943h-12.85V8.237h.7a4.966,4.966,0,0,0,.911-.028.72.72,0,0,0,.461-1.008.769.769,0,0,0-.39-.355c-.125-.046-.08-.044-.936-.045-.433,0-.824,0-.868,0" transform="translate(-267.5 -0.375)" fill="#fff" fill-rule="evenodd"/>
                    </svg>
                  </div>
                  <p className='text-text'><span className='underline text-white'>Click to upload</span> or drag and drop</p>
                  <p className='text-text text-[10px] mt-[8px]'>SVG, PNG, JPG (MAX 1000X1000)</p>
                </div>
            </div>
          </div>
        </div>
        <div className='bg-primaryvariant1 h-[1px] w-full my-[40px]'></div>
        <div className='flex flex-col ss:flex-row'>
          <div className='w-full ss:w-2/6 pr-[40px] mb-[40px] ss:mb-0'>
            <h6 className='text-[20px] text-white mb-[8px]'>Email</h6>
            <p className='text-text '>Modify your email address.</p>
          </div>
          <div className='w-full ss:w-4/6'>
            <div className='flex gap-[28px]'>
                <Input
                  id="Email"
                  value="hello@kojiado.com"
                  label="Email"
                  type="Email"
                  className='w-[300px]'
                />
            </div>
          </div>
        </div>
        <div className='bg-primaryvariant1 h-[1px] w-full my-[40px]'></div>
        <div className='flex flex-col ss:flex-row'>
          <div className='w-full ss:w-2/6 pr-[40px] mb-[40px] ss:mb-0'>
            <h6 className='text-[20px] text-white mb-[8px]'>Password</h6>
            <p className='text-text '>Change your password.</p>
          </div>
          <div className='w-full ss:w-4/6'>
            <div className='flex gap-[28px]'>
                <Input
                  id="Password"
                  value="123"
                  label="Password"
                  type="Password"
                  className='w-[300px]'
                />
            </div>
          </div>
        </div>
        <div className='bg-primaryvariant1 h-[1px] w-full my-[40px]'></div>
        <Button style='primary' label="SAVE"></Button>
      </div>
      <Footer/>
    </div>
  )
}

export default settings