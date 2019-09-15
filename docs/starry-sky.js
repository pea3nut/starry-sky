~function (global, content) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = content;
    } else {
        if (typeof define === 'function' && define.amd) {
            define(() => content);
        } else {
            global[content.name] = content;
        }
    }
}(this, class StarrySky {
    constructor(el, {
        starRatio = 1 / 800,
        starSize = 1.2,
        maxStarNumber = 10000,
        flickerBaseDuration = 2,
        flickerRandomDurationRange = 5,
        minStarOpacity = 0.1,
        maxStarOpacity = 0.75,
    } = {}) {
        this.el = el;
        this.starRatio = starRatio;
        this.starSize = starSize;
        this.maxStarNumber = maxStarNumber;
        this.flickerRandomDurationRange = flickerRandomDurationRange;
        this.flickerBaseDuration = flickerBaseDuration;
        this.minStarOpacity = minStarOpacity;
        this.maxStarOpacity = maxStarOpacity;

        this.starClass = `star-${String(Math.random()).substr(2)}`;
        if (document.readyState === 'complete') {
            this.draw();
        } else {
            window.addEventListener('DOMContentLoaded', () => this.draw());
        }
    }

    draw() {
        this.setRootStyle();
        this.elArea = (() => {
            const style = getComputedStyle(this.el);
            return parseInt(style.width) * parseInt(style.height);
        })();

        if (!this.elArea) {
            window.addEventListener('load', () => this.draw());
            return;
        }

        this.starDomList = new Array(this.starNumber)
            .fill(null)
            .map(() => this.createStarElement())
        ;
        this.el.appendChild(this.createStyleElement());
        this.starDomList.forEach(i => this.el.appendChild(i));
    }

    get starNumber() { return Math.min(parseInt(this.starRatio * this.elArea), this.maxStarNumber); }

    setRootStyle(){
        this.el.style.width = '100%';
        this.el.style.height = '100%';
        this.el.style.overflow = 'hidden';
        this.el.style.position = 'relative';
    }
    createStyleElement(){
        const styleElement = document.createElement('style');
        styleElement.innerText = `
            .${this.starClass} {
                animation-timing-function: cubic-bezier(0.785, 0.135, 0.15, 0.86);
                animation-direction: alternate;
                animation-iteration-count: infinite;
                background: #fff;
                border-radius: 50%;
                position: absolute;
            }
            @keyframes flickerOut {
                to {opacity: ${this.minStarOpacity};}
            }
            @keyframes flickerIn {
                to {opacity: ${this.maxStarOpacity};;}
            }
        `;
        return styleElement
    }
    createStarElement(){
        const starElement = document.createElement('div');

        const minSize = window.devicePixelRatio * 0.1;
        const startOpacity = Math.random();
        const size = Math.random() * (this.starSize - minSize) + minSize;
        const duration = Math.random() * this.flickerRandomDurationRange + this.flickerBaseDuration;

        starElement.classList.add(this.starClass);
        starElement.style = `
            animation-name: ${startOpacity > 0.5 ? 'flickerOut' : 'flickerIn'};
            opacity: ${startOpacity};
            animation-delay: ${duration * Math.random() / 2}s;
            animation-duration: ${duration}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            height: ${size}px;
            width: ${size}px;
        `.split('\n').map(s => s.trim()).join('');
        return starElement
    }
});
