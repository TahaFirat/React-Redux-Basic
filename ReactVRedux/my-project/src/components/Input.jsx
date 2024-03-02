import React from 'react'

const Input = ({value,placeholder,type,id,name,onChange}) => {
  return (
    <div>
        <input value={value} className='h-10 w-full border rounded-m p-2 outline-none mt-3' placeholder={placeholder} type={type} id={id} name={name} onChange={onChange} />
    </div>
  )
}

export default Input