"use client";

import {X} from 'lucide-react'
import Image from 'next/image';
import { UploadDropzone } from "@/utils/uploadthing";

import "@uploadthing/react/styles.css"

interface FileUploadProps {
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
  value: string;
}


const FileUpload = (props: FileUploadProps) => {
  const fileType=props.value?.split(".").pop()

  if(props.value && fileType!=='pdf')
  {
    return (<div className='relative h-20 w-20 justify-center'>
      <Image src={props.value} fill alt='Uploaded Image' className=' rounded-full'/>
    </div>)
  }
  return (
    <div>
      <UploadDropzone endpoint={props.endpoint} onClientUploadComplete={(res)=>{
        props.onChange(res?.[0].url)
      }} onUploadError={(error: Error)=>{
        console.log(error);
        
      }}/>
    </div>
  )
}

export default FileUpload