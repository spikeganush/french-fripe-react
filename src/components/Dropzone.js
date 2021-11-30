import React, { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import { getStorage, ref } from 'firebase/storage'

const storage = getStorage()

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const activeStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: '#ff1744',
}

function Dropzone({ setImageList }) {
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const newImages = Array.from(acceptedFiles).map((file) => {
        const storageRef = ref(storage, file.name)
        return {
          file: file,
          fileName: file.name,
          status: 'CREATED',
          storageRef: storageRef,
          downloadURL: '',
          description: '',
        }
      })

      setImageList((prevState) => [...prevState, ...newImages])
    }
  }

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    onDrop,
    accept: 'image/png, image/jpeg',
    noClick: true,
    noKeyboard: true,
  })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  return (
    <div className="container-dropzone">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or</p>
        <button onClick={open} variant="contained" color="primary">
          Select Images...
        </button>
      </div>
    </div>
  )
}

export default Dropzone
