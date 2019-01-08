export default function() {
    if ('serviceWorker' in navigator) {
        window.addEventListener("load", () =>{
            navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log(`Service Worker registrado em ${registration.scope}`)
            })
            .catch(err => console.log(err))
        })
    }
}
