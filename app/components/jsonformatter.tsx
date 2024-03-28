import { useState } from 'react';
import styles from './jsonformatter.module.css';

const JsonFormatter: React.FC = () => {
    const [jsonString, setJsonString] = useState<string>('');
    const [formattedJson, setFormattedJson] = useState<string>('');
   
    const handleFormat = () => {
       try {
         const parsedJson = JSON.parse(jsonString);
         setFormattedJson(JSON.stringify(parsedJson, null, 2));
       } catch (error) {
         alert('Invalid JSON');
       }
    };
   
    const handleCopy = () => {
       navigator.clipboard.writeText(formattedJson).then(() => {
         alert('JSON copied to clipboard!');
       }, () => {
         alert('Failed to copy JSON to clipboard.');
       });
    };
   
    const handleDownload = () => {
       const blob = new Blob([formattedJson], { type: 'text/plain' });
       const url = URL.createObjectURL(blob);
       const link = document.createElement('a');
       link.href = url;
       link.download = 'formattedJson.tsx';
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
    };
   
    return (
       <div className={styles.formContainer}>
         <h1>JSON Formatter</h1>
         <textarea
           value={jsonString}
           onChange={(e) => setJsonString(e.target.value)}
           placeholder="Enter JSON here..."
           rows={10}
           cols={50}
         />
         <button onClick={handleFormat}>Format JSON</button>
         <button onClick={handleCopy}>Copy JSON</button>
         <button onClick={handleDownload}>Download JSON</button>
         <pre className={styles.jsonOutput}>{formattedJson}</pre>
       </div>
    );
   };
   
   export default JsonFormatter;