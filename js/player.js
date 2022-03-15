class Player {

    constructor(context, x, y) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.radius = 10;
        this.fillStyle = '#22cccc';
        this.strokeStyle = '#009999';
        this.speed = 2;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        context.beginPath();
        context.fillStyle = this.fillStyle;
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.strokeStyle = this.strokeStyle;
        context.stroke();
        context.fill();
    }
}