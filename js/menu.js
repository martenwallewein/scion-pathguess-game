class Menu {

    constructor(context, width, height) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.strokeStyle = '#009999';
        this.fontSize = 25;
        this.minFontSize = 22;
        this.maxFontSize = 28;
        this.fontSizeUp = true;
        this.drawCount = 0;
        this.state = 1;
        this.remotes = [];
        this.remoteIndex = 0;
        this.fillStyle = '#22cccc';
        this.availablePaths = [];
        this.pathIndex = 0;
    }

    draw() {
        if (this.state == 1) {
            if (this.drawCount % 7 == 0) {
                if (this.fontSize == this.minFontSize) {
                    this.fontSizeUp = true;
                } else if (this.fontSize == this.maxFontSize) {
                    this.fontSizeUp = false;
                }

                if (this.fontSizeUp) {
                    this.fontSize++;
                } else {
                    this.fontSize--;
                }
            }
            this.drawCount++;

            context.font = 30 + 'px Arial';
            context.fillStyle = 'black';
            let { width } = this.context.measureText("SCION PathRace - Guess the right latency");
            this.context.fillText("SCION PathGuess - Guess the best latency", (canvas.width / 2) - (width / 2), (canvas.height / 2));


            context.font = this.fontSize + 'px Arial';
            let spaceBarWidth = this.context.measureText("Press Space to start").width;
            this.context.fillText("Press Space to start", (canvas.width / 2) - (spaceBarWidth / 2), 300);
        } else if (this.state == 2) {
            let startY = 70;
            context.font = 18 + 'px Arial';
            this.remotes.forEach((r, i) => {
                let spaceBarWidth = this.context.measureText(r).width;
                this.context.fillText(r, (canvas.width / 2) - (spaceBarWidth / 2), startY);
                if (i === this.remoteIndex) {
                    context.beginPath();
                    context.fillStyle = this.fillStyle;
                    context.arc((canvas.width / 2) - (spaceBarWidth / 2) - 20, startY, 10, 0, Math.PI * 2, true);
                    context.strokeStyle = this.strokeStyle;
                    context.stroke();
                    context.fill();
                    context.fillStyle = 'black';
                }

                startY += 70;
            });


            let spaceBarWidth = this.context.measureText("Please select a SCION destination using space").width;
            this.context.fillText("Please select a SCION destination using space", (canvas.width / 2) - (spaceBarWidth / 2), 300);
        } else if (this.state == 3) {
            let startY = 70;
            context.font = 18 + 'px Arial';
            const remote = this.remotes[this.remoteIndex];
            this.availablePaths[remote].forEach((r, i) => {
                let spaceBarWidth = this.context.measureText(r).width;
                this.context.fillText(r, (canvas.width / 2) - (spaceBarWidth / 2), startY);
                if (i === this.pathIndex) {
                    context.beginPath();
                    context.fillStyle = this.fillStyle;
                    context.arc((canvas.width / 2) - (spaceBarWidth / 2) - 20, startY, 10, 0, Math.PI * 2, true);
                    context.strokeStyle = this.strokeStyle;
                    context.stroke();
                    context.fill();
                    context.fillStyle = 'black';
                }

                startY += 70;
            });


            let spaceBarWidth = this.context.measureText("Please select a SCION path using space").width;
            this.context.fillText("Please select a SCION path using space", (canvas.width / 2) - (spaceBarWidth / 2), 300);
        }

    }
}

