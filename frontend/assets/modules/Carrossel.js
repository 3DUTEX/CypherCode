class Carrossel {
    constructor(carrossel) {
        this.carrossel = carrossel;
        this.qtdScroll = this.carrossel.clientWidth;
        this.carlementos = this.carrossel.querySelectorAll("div");
        this.maxScroll = this.qtdScroll * this.carlementos.length;
        this.totalScroll = 0;
    }

    comIntervalo(intervalo) {
        setInterval(() => {
            if (this.totalScroll >= this.maxScroll) this.totalScroll = 0;
            this.carrossel.scrollTo(this.totalScroll, 0);
            this.totalScroll += this.qtdScroll;
        }, intervalo)
    }
}

export default Carrossel;