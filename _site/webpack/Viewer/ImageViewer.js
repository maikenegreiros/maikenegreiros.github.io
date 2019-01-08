class ImageViewer {
    constructor(images) {
        this.currentImage
        this.built
        this.images = images;

        for (let i = 0; i < this.images.length; i++) {
            this.images[i].addEventListener("click", () => {
                this.buildViewerWindow();
                this.alterImageViewer(this.images[i].getAttribute('src'))
            });
        }
    }

    buildViewerWindow() {
        if (this.built) {
            document.querySelector('.image-viewer-container').classList.remove('oculto');
            return;
        }
        let container = document.createElement('div');
        container.classList.add("image-viewer-container")
        document.querySelector('body').appendChild(container);

        const html =
        "<img class=\"image-viewer\" src=\"\">" +
        "<div class=\"bts-viewers-container\">" +
            "<button class=\"bt-viewer bt-previous\">Anterior</button>" +
            "<button class=\"bt-viewer bt-next\">Próxima</button>" +
            "<button class=\"bt-viewer bt-close\">Fechar</button>" +
        "</div>"
        container.innerHTML = html;

        this.addEventListeners();

        this.built = true;

        return this;
    }

    addEventListeners() {
        document.querySelector('.bt-next').addEventListener("click", () => {
            this.nextImage()
        })
        document.querySelector('.bt-previous').addEventListener("click", () => {
            this.previousImage()
        })
        document.querySelector('.bt-close').addEventListener("click", () => {
            this.close()
        })

        return this;
    }

    alterImageViewer(fileName) {
        let img = document.querySelector('.image-viewer');
        img.setAttribute('src', fileName)

        this.setCurrentImage();

        return this;
    }

    setCurrentImage() {
        let img = document.querySelector('.image-viewer');
        let src = img.getAttribute('src');

        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].getAttribute('src') == src) {
                this.currentImage = this.images[i];
            }
        }

        return this;
    }

    getCurrentImage() {
        return this.currentImage;
    }

    nextImage() {
        let nextImage;
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i] == this.getCurrentImage()) {
                if (i == this.images.length - 1) {
                    nextImage = this.images[0]
                } else {
                    nextImage = this.images[i + 1]
                }
            }
        }

        let nextImageSrc = nextImage.getAttribute('src')
        this.alterImageViewer(nextImageSrc);

        return this;
    }

    previousImage() {
        let previousImage;
        for (let i = 0; i < this.images.length; i++) {
            if (this.images[i] == this.getCurrentImage()) {
                if (i == 0) {
                    previousImage = this.images[this.images.length - 1]
                } else {
                    previousImage = this.images[i - 1]
                }
            }
        }

        let previousImageSrc = previousImage.getAttribute('src')
        this.alterImageViewer(previousImageSrc);

        return this;
    }

    close() {
        document.querySelector('.image-viewer-container').classList.add('oculto');

        return this;
    }
}

export { ImageViewer }
