import { ImageViewer } from './ImageViewer'

export default function() {
    window.addEventListener("DOMContentLoaded", () => {
        const images = document.querySelectorAll('img')
        new ImageViewer(images);
    });
}
