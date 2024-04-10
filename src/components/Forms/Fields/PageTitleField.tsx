import React, { JSX, useRef, useState } from 'react'

interface TProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  canEdit: boolean
}

const PageTitleField = (props: TProps): JSX.Element => {
  const { value, onChange, placeholder, canEdit } = props
  const ref = useRef<HTMLHeadingElement>(null)
  const [showPlaceholder, setShowPlaceholder] = useState(value.trim() === '')

  return (
    <div className="w-full font-display text-7xl relative">
      {!value && placeholder && showPlaceholder && (
        <div className="absolute z-0 px-6 w-full text-stone-400 text-center">{placeholder}</div>
      )}
      <h1
        contentEditable={canEdit}
        suppressContentEditableWarning={true}
        ref={ref}
        className={`relative z-10 border-none bg-transparent px-6 -mt-1 break-words text-center outline-none`}
        onBlur={(e) => onChange(e.currentTarget.textContent || '')}
        onInput={(e) => {
          setShowPlaceholder(e.currentTarget.textContent?.trim() === '')
        }}
      >{value}</h1>
    </div>
  )
}

export default PageTitleField