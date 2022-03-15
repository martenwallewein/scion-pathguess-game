class Link {

    constructor(context, as1, as2) {
        this.as1 = as1;
        this.as2 = as2;
        this.context = context;
        this.strokeStyle = '#009999';
    }

    draw() {
        context.beginPath();
        context.strokeStyle = this.strokeStyle;
        context.moveTo(this.as1.x, this.as1.y);
        context.lineTo(this.as2.x, this.as2.y);
        context.stroke();
    }
}