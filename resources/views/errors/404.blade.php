@extends('errors::minimal')

@section('title', __('Página no encontrada'))
@section('code')
<style>
    * {
        border: 0 !important;
        box-sizing: border-box !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    :root {
        font-size: calc(16px + (20 - 16)*(100vw - 320px)/(1024 - 320)) !important;
    }
    body {
        background: #f1f1f1  !important;
        color: #242424 !important;
        font: 1em "Hind", Arial, sans-serif !important;
        line-height: 1.5 !important;
    }
    .code {
        border-right: 2px solid;
        font-size: 16px !important;
        padding: 0 15px 0 15px;
        text-align: left !important;
    }
    .message{
        text-align: left;
    }
    a {
        color: #2762f3 !important;
        text-decoration: none !important;
    }
    a:hover {
        text-decoration: underline !important;
    }
    a:active {
        color: #0c48db !important;
    }
    a:visited {
        color: #5785f6 !important;
    }
    h1 {
        font: 2em "Ubuntu", Arial, sans-serif ;
        line-height: 1.5 !important;
        margin-bottom: .75em !important;
    }
    p, ul {
        margin-bottom: 1.5em !important;
    }
    ul {
        margin-left: 1.5em !important;
    }
    body, canvas {
        display: block !important;
    }
    canvas {
        display: block !important;
        margin: 0 auto 1.5em auto !important;
        width: 100% !important;
        height: auto !important;
        -webkit-tap-highlight-color: transparent !important;
    }
    .wrap {
        margin: auto !important;
        padding: 1.5em !important;
        max-width: 37.5em !important;
    }
    @media (prefers-color-scheme: dark) {
        body {
            background: #242424 !important;
            color: #f1f1f1 !important;
        }
        a {
            color: #5785f6 !important;
        }
        a:active {
            color: #2762f3 !important;
        }
        a:visited {
            color: #87a9f9 !important;
        }    
    }
    @media (min-width: 200px) and (max-width: 767px) {
        .flex-center {
            display: inline-block !important;
        }
    }
</style>

<script>
    window.addEventListener("DOMContentLoaded",game);

    function game() {
        var canvas = document.querySelector("canvas"),
            c = canvas.getContext("2d"),
            W = canvas.width,
        H = canvas.height,
        S = 2,
        assets = [
            "https://i.ibb.co/dDcTzrQ/nowhere.png",
            "https://i.ibb.co/S7zPTv5/tumbleweed.png"
        ],
        sprites = [],
        score = 0,
        world = {
            friction: 0.1,
            gravity: 0.1
        },
        tumbleweed = {
            inPlay: false,
            x: -160,
            y: 200,
            r: 32,
            rotation: 0,
            xVel: 11.5,
            yVel: 0,
            mass: 2.5,
            restitution: 0.3
        },
        loadSprite = url => {
            return new Promise((resolve,reject) => {
                let sprite = new Image();
                sprite.src = url;
                sprite.onload = () => {
                    resolve(sprite);
                };
                sprite.onerror = () => {
                    reject(url);
                };
            });
        },
        spritePromises = assets.map(loadSprite),
        applyForce = e => {
            let ex = e.clientX - canvas.offsetLeft,
                ey = e.clientY - (canvas.offsetTop - window.pageYOffset);

            ex = ex / canvas.offsetWidth * W;
            ey = ey / canvas.offsetHeight * H;

            let insideX = Math.abs(ex - tumbleweed.x) <= tumbleweed.r,
                insideY = Math.abs(ey - tumbleweed.y) <= tumbleweed.r;

            if (insideX && insideY) {
                let xForce = tumbleweed.x - ex, 
                    yForce = tumbleweed.y - ey,
                    xAccel = xForce / tumbleweed.mass,
                    yAccel = yForce / tumbleweed.mass;

                tumbleweed.xVel += xAccel;
                tumbleweed.yVel += yAccel;

                ++score;
                
                // when enabled, the tumbleweed will be allowed to touch the left side after rolling in
                if (!tumbleweed.inPlay)
                    tumbleweed.inPlay = true;
            }
        },
        update = () => {
            // A. Background
            c.clearRect(0,0,W,H);
            c.drawImage(sprites[0],0,0,W,H);

            // B. Tumbleweed
            tumbleweed.x += tumbleweed.xVel;
            
            // 1. Friction to the right
            if (tumbleweed.xVel > 0) {
                tumbleweed.xVel -= world.friction;
                if (tumbleweed.xVel < 0)
                    tumbleweed.xVel = 0;
            
            // 2. Friction to the left
            } else if (tumbleweed.xVel < 0) {
                tumbleweed.xVel += world.friction;
                if (tumbleweed.xVel > 0)
                    tumbleweed.xVel = 0;
            }
            
            // 3. Horizontal collision
            let hitLeftBound = tumbleweed.x <= tumbleweed.r && tumbleweed.inPlay,
                hitRightBound = tumbleweed.x >= W - tumbleweed.r;

            if (hitLeftBound)
                tumbleweed.x = tumbleweed.r;
            else if (hitRightBound)
                tumbleweed.x = W - tumbleweed.r;

            if (hitLeftBound || hitRightBound)
                tumbleweed.xVel *= -tumbleweed.restitution;
            
            // 4. Vertical collision
            tumbleweed.y += tumbleweed.yVel;
            tumbleweed.yVel += world.gravity;

            let hitTopBound = tumbleweed.y <= tumbleweed.r,
                hitBottomBound = tumbleweed.y >= H - tumbleweed.r;

            if (hitTopBound) {
                tumbleweed.y = tumbleweed.r;

            } else if (hitBottomBound) {
                tumbleweed.y = H - tumbleweed.r;
                score = 0;
            }
            if (hitTopBound || hitBottomBound)
                tumbleweed.yVel *= -tumbleweed.restitution;
            
            // 5. Rotation
            tumbleweed.rotation += tumbleweed.xVel;

            if (tumbleweed.rotation >= 360)
                tumbleweed.rotation -= 360;
            else if (tumbleweed.rotation < 0)
                tumbleweed.rotation += 360;
            
            // 6. Drawing
            c.save();
            c.translate(tumbleweed.x,tumbleweed.y);
            c.rotate(tumbleweed.rotation * Math.PI/180);
            c.drawImage(
                sprites[1],
                -tumbleweed.r,
                -tumbleweed.r,
                tumbleweed.r * 2,
                tumbleweed.r * 2
            );
            c.translate(-tumbleweed.x,-tumbleweed.y);
            c.restore();

            // C. Score
            if (score > 0) {
                c.fillStyle = "#7f7f7f";
                c.font = "48px Hind, sans-serif";
                c.textAlign = "center";
                c.fillText(score,W/2,48);
            }
        },
        render = () => {
            update();
            requestAnimationFrame(render);
        };
    
    // ensure proper resolution
    canvas.width = W * S;
    canvas.height = H * S;
    c.scale(S,S);
    
    // load sprites
    Promise.all(spritePromises).then(loaded => {
        for (let sprite of loaded)
            sprites.push(sprite);

        render();
        canvas.addEventListener("click",applyForce);

    }).catch(urls => {
        console.log(urls+" couldn’t be loaded");
    });
    }
</script>

<div class="wrap">
    <h1>Oh! Error 404</h1>
    <p>Estás en el medio de la nada. La página que solicitó se movió o no existe.</p>
    <p>Lo que puedes hacer:</p>
        <ul>
            <li><a href="/">Inicio</a> Regresa al página principal.</li>
            <li><a href="about-us">Contacto</a> para mí si crees que esto sucedió por error.</li>
        </ul>
    
</div>
@endsection

@section('message')
<div class="wrap">
    <canvas width="560" height="312"></canvas>
</div>

@endsection

