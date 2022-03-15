class AS {

    constructor(context, x, y, rightText, id) {
        this.x = x;
        this.y = y;
        this.context = context;
        this.radius = 30;
        this.fillStyle = '#22FFaa';
        this.strokeStyle = '#009999';
        this.rightText = rightText;
        this.id = id;
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

        context.font = '25px Arial';
        context.fillStyle = 'black';
        context.fillText(this.id, this.rightText ? this.x + 50 : this.x - 200, this.y);
    }
}