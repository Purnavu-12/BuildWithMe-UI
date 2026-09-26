// Adapted from https://github.com/Ashutoshx7/VengeanceUI/blob/main/src/components/ui/folder-preview.tsx under MIT. Copyright (c) Ashutoshx7.
'use client';
import '../../shared/base.css';
import './folder-preview.css';
export default function FolderPreview({label='Folder preview',paused=false}:{label?:string;paused?:boolean}){return <div className="bw-demo" data-active={!paused}><details className="adapt-folder"><summary>{label}<span>3 files</span></summary><div><i/><i/><i/><p>manifest.ts<br/>react.tsx<br/>styles.css</p></div></details></div>}
