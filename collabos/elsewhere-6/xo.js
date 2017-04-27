window.onload = function() { Physics(function( world ){
    var renderer = Physics.renderer('canvas', {
        el: 'viewport', // id of the canvas element
        width: window.innerWidth,
        height: window.innerHeight
    });

    var edgeBounce = Physics.behavior('edge-collision-detection', {
        aabb: Physics.aabb(0, 0, window.innerWidth, window.innerHeight),
        restitution: 0.80,
        cof: 0.8
    });

    window.addEventListener('resize', function () {
        renderer.el.width = window.innerWidth;
        renderer.el.height = window.innerHeight;

        edgeBounce.setAABB(Physics.aabb(0, 0, window.innerWidth, window.innerHeight));
    }, true);

    world.add([
        renderer,
        Physics.behavior('body-impulse-response'),
        Physics.behavior('body-collision-detection'),
        Physics.behavior("sweep-prune"),
        edgeBounce
    ]);

    for (var i=0; i<10; i++) {
        world.add(randomRect());
    }

    world.on('step', function () {
        world.render();
    });

    Physics.util.ticker.on(function( time ) {
        world.step( time );
    });

    Physics.util.ticker.start();
})};

var randomRect = function() {
    var rect;
    if (Math.random() > 0.5) {
        rect = Physics.body('rectangle', randomize({ width: 50, height: 50 }));
        rect.view = new Image();
        rect.view.src = "x.png";
    } else {
        rect = Physics.body('rectangle', randomize({ width: 50, height: 50 }));
        rect.view = new Image();
        rect.view.src = "o.png";
    }

    return rect;
};

var randomize = function(rect) {
    rect.x = Math.random() * window.innerWidth;
    rect.y = Math.random() * window.innerHeight;
    rect.vx = Math.random() - 0.5;
    rect.vy = Math.random() - 0.5;

    return rect;
};
