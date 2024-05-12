import React from 'react';

interface ConfirmationDialogProps {
  id: string;
  handleConfirmDelete: (id: string) => void;
  handleCancelDelete: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  id,
  handleConfirmDelete,
  handleCancelDelete,
}) => {
  return (
    <div className='fixed w-[300px] right-[50px] bottom-[50px] z-50 bg-[#0a0a0a] shadow-[0_0_25px_rgba(255,255,255,0.4)] p-[30px] rounded-[12px]'>
      <p className='text-white'>Are you sure?</p>
      <div className='flex gap-[20px] mt-[24px]'>
        <button
          className='bg-accent text-white w-full py-[8px] rounded-[6px]'
          onClick={() => handleConfirmDelete(id)}
        >
          Yes
        </button>
        <button
          className='border-white border-[1px] text-white w-full py-[8px] rounded-[6px]'
          onClick={handleCancelDelete}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationDialog;