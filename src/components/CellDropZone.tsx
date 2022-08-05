import { useCallback, useMemo } from "react"
import { useDropzone } from "react-dropzone"

import '../styles/components/CellDropZone.css';

function CellDropZone(props: {handleDrop: (file: string | ArrayBuffer | null) => void}) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const content = reader.result
        props.handleDrop(content);
      }
      reader.readAsText(file)
    })
  }, [props])

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: onDrop,
    accept: {
      'application/json': ['.json']
    }
  });

  const className = useMemo(() => {
    var name = "dropzone";

    if(isFocused){ name += " focused"}
    if(isDragAccept){ name += " accept"}
    if(isDragReject){ name += " reject"}

    return name;
  }, [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const acceptedFileItems = acceptedFiles.map((file: File) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
      <ul>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <section>
      <div {...getRootProps({className: className})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  )
}

export default CellDropZone;
