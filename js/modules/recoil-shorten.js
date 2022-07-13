export default function recoilShorten() {
    const elements = {
        intro: document.querySelector(".intro"),
        shorten: document.getElementById("shortenForm"),
        get shortenContainer() {return this.shorten.parentElement},
        get statistics() {return this.shortenContainer.nextElementSibling}
    };
    const styles = {
        introPaddingBottom: 70,
        shortenHeightHalf: elements.shorten.offsetHeight / 2,
        get statisticsMarginTop()  {
            if (window.matchMedia("(max-width: 1399.98px)").matches) 
                return 80;
            else 
                return 120;
        }
    }

    elements.intro.style.paddingBottom = `${styles.introPaddingBottom + styles.shortenHeightHalf}px`;
    elements.shortenContainer.style.top = `-${styles.shortenHeightHalf}px`;
    elements.statistics.style.marginTop = `${styles.statisticsMarginTop - styles.shortenHeightHalf}px`;
}
recoilShorten()
window.addEventListener("resize", recoilShorten);