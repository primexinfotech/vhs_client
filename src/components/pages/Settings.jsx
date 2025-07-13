import { useEffect } from "react";

export default function Settings() {
    useEffect(() => {
        document.title = 'VHS : Seetings'
    }, [])
  return <div>Settings Page</div>;
}
