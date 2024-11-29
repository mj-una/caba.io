
const p5ui = (g) => {

	let intro = true;
	let borrar = false;
	let dejavu;

	g.preload = () => {
		dejavu = g.loadFont("times_nr.ttf");
	}

  g.setup = () => {
    g.createCanvas(window.innerWidth, window.innerHeight)
			.parent("ui")
			.id("cnvUi");
		g.frameRate(3);

		g.textFont(dejavu);
		g.textSize(g.width * 0.04);
		g.textAlign(g.CENTER, g.CENTER);
		g.strokeWeight(1);
		g.stroke(10);
		g.noFill();
	}

	g.draw = () => {

		if (borrar) {
			borrar = false;
			g.background(1, 1);
			g.clear();
			setTimeout(() => g.clear(), 1);
		}

		if (intro) {
			g.fill(0);
			g.text(
				"presiona",
				g.width * 0.5,
				g.height * 0.9
			);
			return;
		}

		if (g.mouseIsPressed) {

			g.frameRate(30);
			g.fill(0);
			g.text(
				"caba.io",
				g.random(g.width),
				g.random(g.height)
			);
		}
		else {
			g.frameRate(3);
			g.noFill();
			g.text(
				"caba.io",
				g.random(g.width),
				g.random(g.height)
			);
		}
	}

	g.mousePressed = () => {
		if (intro) {
			intro = false;
			borrar = true;
		}
	}

	g.mouseReleased = () => {
		if (intro) {
			intro = false;
		}
		borrar = true;
	}

	g.windowResized = () => {
		g.resizeCanvas(window.innerWidth, window.innerHeight);
	}
}

new p5(p5ui);