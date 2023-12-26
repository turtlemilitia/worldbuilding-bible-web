import React, { FunctionComponent, useState } from 'react'
import { TFileInputProps } from './types'
import { FileInputIcon } from 'lucide-react'

const FileInput: FunctionComponent<TFileInputProps> = ({
  name,
  onChange,
  multiple = false,
  fileSpecificationsText,
  accept
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange(e.target.files)
    }
  }

  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor="dropzone-file"
             className="flex flex-col items-center justify-center w-full h-64 border-2 border-stone-300 border-dashed rounded-lg cursor-pointer bg-stone-50 dark:hover:bg-bray-800 dark:bg-stone-700 hover:bg-stone-100 dark:border-stone-600 dark:hover:border-stone-500 dark:hover:bg-stone-600">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <FileInputIcon/>
          <p className="my-2 text-sm text-stone-500 dark:text-stone-400"><span
            className="font-semibold">Click to upload</span> or
            drag and drop</p>
          {fileSpecificationsText && (
            <p className="text-xs text-stone-500 dark:text-stone-400">{fileSpecificationsText}</p>
          )}
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          name={name}
          onChange={handleFileChange}
          multiple={multiple}
          accept={accept}
        />
      </label>
    </div>
  )
}

export default FileInput